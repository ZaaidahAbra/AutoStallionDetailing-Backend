const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

// Lazy Stripe initialization
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require('stripe');
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn('⚠️ STRIPE_SECRET_KEY not set. Checkout routes will not work.');
}

// Create Stripe Checkout session
router.post('/create-checkout-session', authenticate, async (req, res) => {
    // If Stripe is not configured, return friendly error
    if (!stripe) {
        return res.status(503).json({ error: 'Stripe not configured. Cannot create checkout session.' });
    }

    const { priceId, quantity = 1, successUrl, cancelUrl } = req.body;

    if (!priceId || !successUrl || !cancelUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: req.user?.email,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: 'Stripe checkout session failed.' });
    }
});

module.exports = router;
