const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");

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

// we need to build a register post route
//takes body, hashes pw
// stores everything in db
// set a cookie (i.e. req.session.userId = result.rows[0].id, will equal some number)
//if it works, res.json({success: true})

// POST /register

app.post("/register", (req, res) => {
    console.log("This is the req.body: ", req.body);
    let { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            return db.register(first, last, email, hashedPw);
        })
        .then(({ rows }) => {
            req.session.userID = rows[0].id;
            console.log("This is the session object: ", req.session);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Error in POST /register in index.js: ", err);
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
