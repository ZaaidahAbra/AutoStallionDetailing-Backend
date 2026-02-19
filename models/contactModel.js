const pool = require('./db');

async function createContact({ name, email, subject, message }) {
  const result = await pool.query(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
    [name, email, subject, message]
  );
  return result.rows[0].id;
}

module.exports = { createContact };
