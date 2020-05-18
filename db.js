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

/////FRIENDSHIP/////

module.exports.getFriendshipStatus = (viewed, viewer) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [viewed, viewer]
    );
};

module.exports.addFriendship = (receiver_id, sender_id) => {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
        VALUES ($1, $2)
        RETURNING *;`,
        [receiver_id, sender_id]
    );
};

module.exports.acceptFriendship = (receiver_id, sender_id) => {
    return db.query(
        `UPDATE friendships SET accepted = TRUE
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports.deleteFriendship = (receiver_id, sender_id) => {
    return db.query(
        `DELETE FROM friendships WHERE
        (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports.getFriendsWannabes = (id) => {
    return db.query(
        `SELECT users.id, first, last, image_url, accepted 
        FROM friendships 
        JOIN users 
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id) 
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id) 
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id);`,
        [id]
    );
};

/////CHAT/////

module.exports.getLastTenMessages = () => {
    return db.query(
        `SELECT chats.id AS chats_id, users.id, first, last, image_url, message, messenger_id, chats.created_at
        FROM users
        JOIN chats
        ON users.id = messenger_id ORDER BY chats_id DESC LIMIT 10;`
    );
};
