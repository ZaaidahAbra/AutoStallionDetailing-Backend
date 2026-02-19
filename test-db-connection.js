
require('dotenv').config();
console.log('ENV:', process.env.DATABASE_URL);
const pool = require('./models/db.js');

(async () => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS test');
    console.log('PostgreSQL connection test successful:', result.rows);
  } catch (err) {
    console.error('PostgreSQL connection test failed:', err);
}})();
