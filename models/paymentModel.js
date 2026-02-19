const pool = require('./db');

const createPayment = async (payment) => {
    const result = await pool.query(
        'INSERT INTO payments (userId, bookingId, amount, method, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [payment.userId, payment.bookingId, payment.amount, payment.method, payment.status || 'pending']
    );
    return result.rows[0].id;
};

const getPaymentsByUser = async (userId) => {
    const result = await pool.query('SELECT * FROM payments WHERE userId = $1', [userId]);
    return result.rows;
};

module.exports = { createPayment, getPaymentsByUser };
