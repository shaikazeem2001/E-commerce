const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ success: false, error: "No products in cart" });
        }

        const line_items = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(product.new_price * 100), // Stripe expects amounts in cents
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/checkout?success=true`,
            cancel_url: `http://localhost:5173/checkout?canceled=true`,
        });

        res.json({ success: true, sessionId: session.id, url: session.url });
    } catch (error) {
        console.error("❌ Stripe Session Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createCheckoutSession };
