const pool = require('./db');

const getAllPackages = async () => {
    const result = await pool.query('SELECT * FROM packages WHERE isActive = TRUE');
    return result.rows;
};

module.exports = { getAllPackages };
