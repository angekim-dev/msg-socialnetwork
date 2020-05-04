const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const db = require("./db");
const { hash, compare } = require("./bc");

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

app.post("/register", (req, res) => {
    let { first, last, email, password } = req.body;
    console.log("***req.body: ", req.body);
    hash(password)
        .then((hashedPw) => {
            return db.register(first, last, email, hashedPw);
        })
        .then(({ rows }) => {
            req.session.userId = rows[0].id;
            console.log("**session object: ", req.session);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Error in POST /register in index.js: ", err);
        });
});

app.post("/login", (req, res) => {
    console.log("this is the POST login in index.js");
    let email = req.body.email;
    let password = req.body.password;
    req.session.user = {};
    // const user = req.session.user;
    console.log("***user***", req.session.user);
    //in our login, we use compare!
    //we take the users provided password and compare it to what we have stored as a hash in our db
    let id;
    db.getUserInfo(email)
        .then((result) => {
            // console.log("***result", result);
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
                req.session.user.userId = id;
                console.log("***JUST ASSIGNED IT****", req.session.user.userId);
                // res.redirect("/thanks"); // redirect to /petition or /thanks, depending on data flow
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

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

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
