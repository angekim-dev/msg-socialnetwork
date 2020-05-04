const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.register = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
        [first, last, email, password]
    );
};

module.exports.getUserInfo = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};

module.exports.verifyUser = (email) => {
    `SELECT * FROM reset_codes
    WHERE (CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes') AND (email = $1)
    ORDER BY id DESC
    LIMIT 1;`[email];
};

module.exports.insertCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
        RETURNING email`,
        [email, code]
    );
};

// INSERT

// SELECT

// UPDATE
