const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ success: false, error: "No products in cart" });
        }

        // Calculate total amount in cents
        const amount = products.reduce((total, product) => {
            return total + (product.new_price * product.quantity);
        }, 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ 
            success: true, 
            clientSecret: paymentIntent.client_secret 
        });
    } catch (error) {
        console.error("❌ Stripe PaymentIntent Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createPaymentIntent };
