const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

// Lazy load paymentController only if Stripe is configured
let paymentController;
if (process.env.STRIPE_SECRET_KEY) {
    paymentController = require('../controllers/paymentController');
} else {
    console.warn('⚠️ STRIPE_SECRET_KEY not set. Payment routes will not work.');
    // Fallback: simple placeholder functions
    paymentController = {
        create: (req, res) => res.status(503).json({ error: 'Stripe not configured. Cannot create payment.' }),
        getUserPayments: (req, res) => res.status(503).json({ error: 'Stripe not configured. Cannot get payments.' })
    };
}

// Routes
router.post('/', authenticate, paymentController.create);
router.get('/my', authenticate, paymentController.getUserPayments);

module.exports = router;
