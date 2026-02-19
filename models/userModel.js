const pool = require('./db');

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const createUser = async (user) => {
    const result = await pool.query(
        'INSERT INTO users (firstName, lastName, email, password, phone, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [user.firstName, user.lastName, user.email, user.password, user.phone, user.address]
    );
    return result.rows[0].id;
};

const updateUserPassword = async (email, hashedPassword) => {
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
};

module.exports = { findUserByEmail, createUser, updateUserPassword };
