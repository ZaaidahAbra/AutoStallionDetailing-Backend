const pool = require('./db');

const createRefund = async (refund) => {
    const result = await pool.query(
        'INSERT INTO refunds (userId, bookingId, amount, reason, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [refund.userId, refund.bookingId, refund.amount, refund.reason, refund.status || 'pending']
    );
    return result.rows[0].id;
};

const getRefundsByUser = async (userId) => {
    const result = await pool.query('SELECT * FROM refunds WHERE userId = $1', [userId]);
    return result.rows;
};

module.exports = { createRefund, getRefundsByUser };
