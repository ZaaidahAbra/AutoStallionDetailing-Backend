const pool = require('./db');


// createBooking uses userId, packageId, carSize, and new schema
const createBooking = async (booking) => {
    const result = await pool.query(
        'INSERT INTO bookings (userId, packageId, carSize, bookingDate, bookingTime, vehicleType, vehicleModel, customerNotes, customerAddress, totalPrice, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
        [booking.userId, booking.packageId, booking.carSize, booking.bookingDate, booking.bookingTime, booking.vehicleType, booking.vehicleModel, booking.customerNotes, booking.customerAddress, booking.totalPrice, 'pending']
    );
    return result.rows[0].id;
};


const getBookingsByUser = async (userId) => {
    const result = await pool.query('SELECT * FROM bookings WHERE userId = $1', [userId]);
    return result.rows;
};


const getAllBookings = async () => {
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows;
};

module.exports = { createBooking, getBookingsByUser, getAllBookings };
