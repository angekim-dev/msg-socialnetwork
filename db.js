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

module.exports.getUser = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
};

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3;`);
};

module.exports.getSearchedUsers = (val) => {
    return db.query(
        `SELECT * FROM users
        WHERE first ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.verifyUser = (email) => {
    return db.query(
        `SELECT * FROM reset_codes
        WHERE (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes') AND (email = $1)
        ORDER BY id DESC
        LIMIT 1;`,
        [email]
    );
};

module.exports.insertCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
        RETURNING email;`,
        [email, code]
    );
};

module.exports.updatePassword = (email, newPassword) => {
    return db.query(
        `UPDATE users SET password = $2
        WHERE email = $1;`,
        [email, newPassword]
    );
};

module.exports.updatePic = (id, image_url) => {
    return db.query(
        `UPDATE users
        SET image_url = $2
        WHERE id = $1
        RETURNING *;`,
        [id, image_url]
    );
};

module.exports.updateBio = (id, bio) => {
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio;`,
        [id, bio]
    );
};
