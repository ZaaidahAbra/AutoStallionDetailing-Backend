// Load environment variables
require('dotenv').config();

// Import packages
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./models/db');

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:8080',
        'http://localhost:8081',
        'https://mobile-detailing-ecommerce.vercel.app' 
    ],
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// PostgreSQL Connection Test
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const packageRoutes = require('./routes/packages');
const contactRoutes = require('./routes/contact');
const checkoutRoutes = require('./routes/checkout');
const refundRoutes = require('./routes/refunds');
const paymentRoutes = require('./routes/payments');
const stripeRoutes = require('./routes/stripe');

// Base route
app.get('/', (req, res) => {
    res.send('Backend API is running');
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/refunds', refundRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/stripe', stripeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
