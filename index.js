const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const s3 = require("./s3");
const config = require("./config.json");

const db = require("./db");
const { hash, compare } = require("./bc");

const ses = require("./ses");
const cryptoRandomString = require("crypto-random-string");

////////////// IMAGE UPLOAD BOILERPLATE ///////////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
////////////////////////////////////////////

app.use(compression());
app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: "I'm always angry",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

// csurf security
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

////// POST /register /////
app.post("/register", (req, res) => {
    let { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            return db.register(first, last, email, hashedPw);
        })
        .then(({ rows }) => {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ success: false });
            console.log("Error in POST /register in index.js: ", err);
        });
});

// app.post("/register", async (req, res) => {
//     const { first, last, email, password } = req.body;

//     try {
//         let hashedPw = await hash(password);
//         console.log("hashedPw", hashedPw);
//         let id = await db.register(first, last, email, hashedPw);

//         req.session.userId = id;
//         res.json({ success: true });
//     } catch (e) {
//         console.log("e in post register", e);
//         res.json({ success: false });
//     }
// });

////// POST /login /////
app.post("/login", (req, res) => {
    console.log("this is the POST login in index.js");
    let email = req.body.email;
    let password = req.body.password;
    req.session = {};
    let id;
    db.getUserInfo(email)
        .then((result) => {
            let hashedPw = result.rows[0].password;
            id = result.rows[0].id;
            return hashedPw;
        })
        .then((hashedPw) => {
            return compare(password, hashedPw);
        })
        .then((matchValue) => {
            console.log("matchValue :", matchValue);
            if (matchValue == true) {
                req.session.userId = id;
                console.log("userId in getUserInfo /login", req.session.userId);
                res.json({ success: true });
            } else if (matchValue != true) {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("Error in getUserInfo: ", err);
            res.json({ success: false });
        });
});

////// POST /password/reset/start /////
app.post("/password/reset/start", (req, res) => {
    let { email } = req.body;
    db.getUserInfo(email)
        .then(({ rows }) => {
            const restoreCode = cryptoRandomString({ length: 6 });
            db.insertCode(rows[0].email, restoreCode)
                .then(({ rows }) => {
                    let to = rows[0].email;
                    let subject = "Your code for the reset of your password";
                    let text =
                        "Here you go: " +
                        restoreCode +
                        " If you did not require it, please ignore the message.";
                    ses.sendEmail(to, subject, text)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log(
                                "Error in POST /password/reset/start in sendEmail",
                                err
                            );
                            res.json({ success: false });
                        });
                })
                .catch((err) => {
                    console.log(
                        "Error in POST /password/reset/start in insertCode",
                        err
                    );
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log(
                "Error in POST /password/reset/start in getUserInfo",
                err
            );
            res.json({ error: true });
        });
});

////// POST /password/reset/verify /////
app.post("/password/reset/verify", (req, res) => {
    let { email, code, newPassword } = req.body;
    db.verifyUser(email)
        .then(({ rows }) => {
            if (code === rows[0].code) {
                hash(newPassword)
                    .then((hashedPw) => {
                        db.updatePassword(email, hashedPw);
                    })
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        res.json({ success: false });
                        console.log(
                            "Error in POST /password/reset/start in updatePassword in index.js",
                            err
                        );
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log(
                "Error in POST /password/reset/start in verifyUser in index.js",
                err
            );
            res.json({ error: true });
        });
});

///// POST /upload /////
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("file: ", req.file); // file we just uploaded
    console.log("input: ", req.body); // input fields from the client
    console.log("***hallo s3", config.s3Url);
    console.log("***hallo url", config.s3Url + req.file.filename);
    let url = config.s3Url + req.file.filename;
    req.body.image_url = url;
    if (req.file) {
        // you'll want to eventually make a db insert here for all the info
        return db
            .updatePic(req.session.userId, url)
            .then(({ rows }) => {
                let profilePic = {
                    imageUrl: rows[0].image_url,
                };

                res.json(profilePic); //needs to be an object
            })
            .catch((err) => {
                console.log("Error in updatePic: ", err);
                res.json({ success: false });
            });
    } else {
        res.json({
            success: false,
        });
    }
});

////// GET /welcome /////
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

///// GET /logout /////
app.get("/logout", (req, res) => {
    console.log("**logout!");

    req.session = null;
    res.redirect("/");
});

///// GET /user /////
app.get("/user", (req, res) => {
    // console.log("GET /user");
    // console.log("req.session.userId in index.js", req.session.userId);
    return db
        .getUser(req.session.userId)
        .then(({ rows }) => {
            // console.log("rows[0] in get user in index.js", rows[0]);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("Error in getUser in index.js: ", err);
        });
});

////// GET /* /////
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
