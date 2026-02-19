const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

// Lazy Stripe initialization
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require('stripe');
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn('⚠️ STRIPE_SECRET_KEY not set. Stripe routes will not work.');
}

// Create a Stripe PaymentIntent
router.post('/create-payment-intent', authenticate, async (req, res) => {
    // Return friendly error if Stripe is not configured
    if (!stripe) {
        return res.status(503).json({ error: 'Stripe not configured. Cannot create payment intent.' });
    }

    const { amount, currency } = req.body;
    if (!amount || !currency) {
        return res.status(400).json({ message: 'Amount and currency required' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { userId: req.user.id }
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: 'Failed to create payment intent.' });
    }
});

module.exports = router;
