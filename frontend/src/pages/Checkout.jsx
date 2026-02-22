import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Loader2 } from "../components/Icons";
import "./css/Checkout.css";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Shopcontext } from "../context/Shopcontext";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with public key from env or provided directly for testing
const stripePromise = loadStripe("pk_test_51Qr48xR7l8q7Y7Q7..."); // This should ideally be in .env

const PaymentForm = ({ formData, productsToPay, amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { cartItems, all_product, getTotalCartAmount, setCartItems } = useContext(Shopcontext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            // 1. Create PaymentIntent on the backend
            const { data } = await api.post("/api/payment/create-payment-intent", {
                products: productsToPay,
            });

            if (!data.success) {
                throw new Error(data.error || "Failed to create payment intent");
            }

            // 2. Confirm the payment on the frontend
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.fullName,
                        email: formData.email,
                        address: {
                            line1: formData.address,
                            city: formData.city,
                            postal_code: formData.zipCode,
                        },
                    },
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    toast.success("Payment successful! 🍔");
                    // Clear cart on success
                    const emptyCart = {};
                    for (let i = 0; i <= 300; i++) emptyCart[i] = 0;
                    setCartItems(emptyCart);
                    onSuccess();
                }
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(error.message || "Something went wrong with the payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="checkout-form card" onSubmit={handleSubmit}>
            <button
                type="button"
                className="text-btn back-btn"
                onClick={() => onSuccess(false)}
            >
                <ArrowLeft size={16} /> Back
            </button>
            <h1>
                <CreditCard /> Payment Method
            </h1>
            <p className="payment-desc">
                Enter your card details securely. Your payment is processed by Stripe.
            </p>

            <div className="card-element-container">
                <label className="card-label">Card Details</label>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#1a1a1a",
                                "::placeholder": {
                                    color: "#6b7280",
                                },
                            },
                            invalid: {
                                color: "#ef4444",
                            },
                        },
                    }}
                />
            </div>

            <div className="order-summary card shadow-none bg-surface">
                <h3>Order Summary</h3>
                <div className="summary-row">
                    <p>Subtotal:</p>
                    <span>${amount}</span>
                </div>
                <div className="summary-row">
                    <p>Shipping:</p>
                    <span>Free</span>
                </div>
                <hr />
                <div className="summary-row total">
                    <p>Total:</p>
                    <span>${amount}</span>
                </div>
            </div>

            <button type="submit" className="pay-btn primary-btn" disabled={loading || !stripe}>
                {loading ? <Loader2 className="spinner" /> : `Pay $${amount}`}
            </button>

            <div className="secure-badge">
                <ShieldCheck size={16} /> Secure Encrypted Payment via Stripe
            </div>
        </form>
    );
};

const Checkout = () => {
    const { getTotalCartAmount, cartItems, all_product } = useContext(Shopcontext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: ""
    });

    const productsToPay = Object.keys(cartItems)
        .filter((itemId) => cartItems[itemId] > 0)
        .map((itemId) => {
            const item = all_product.find((p) => p.id === Number(itemId));
            return {
                ...item,
                quantity: cartItems[itemId],
            };
        });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSuccess = (toSuccess = true) => {
        if (toSuccess) {
            setStep(3);
        } else {
            setStep(1);
        }
    };

    if (getTotalCartAmount() <= 0 && step !== 3) {
        return (
            <div className="checkout-empty container">
                <h2>Your cart is empty</h2>
                <button className="primary-btn" onClick={() => navigate("/")}>Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <div className="checkout-steps">
                <div className={`step ${step >= 1 ? "active" : ""}`}>
                    <span className="step-num">1</span>
                    <span className="step-text">Shipping</span>
                </div>
                <div className="step-line" />
                <div className={`step ${step >= 2 ? "active" : ""}`}>
                    <span className="step-num">2</span>
                    <span className="step-text">Payment</span>
                </div>
                <div className="step-line" />
                <div className={`step ${step >= 3 ? "active" : ""}`}>
                    <span className="step-num">3</span>
                    <span className="step-text">Success</span>
                </div>
            </div>

            <div className="checkout-content">
                {step === 1 && (
                    <form className="checkout-form card" onSubmit={handleNextStep}>
                        <h1><Truck /> Shipping Details</h1>
                        <div className="form-grid">
                            <div className="form-group full">
                                <label>Full Name</label>
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" />
                            </div>
                            <div className="form-group full">
                                <label>Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                            </div>
                            <div className="form-group full">
                                <label>Address</label>
                                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Burger St" />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="New York" />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} placeholder="10001" />
                            </div>
                        </div>
                        <button type="submit" className="next-btn primary-btn">Continue to Payment</button>
                    </form>
                )}

                {step === 2 && (
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            formData={formData}
                            productsToPay={productsToPay}
                            amount={getTotalCartAmount()}
                            onSuccess={handleSuccess}
                        />
                    </Elements>
                )}

                {step === 3 && (
                    <div className="checkout-success card text-center">
                        <div className="success-icon-wrapper">
                            <div className="success-icon">✓</div>
                        </div>
                        <h1>Order Successful!</h1>
                        <p className="success-msg">Thank you for your purchase!</p>
                        <p className="success-detail">A confirmation email will be sent to your registered email address shortly.</p>
                        <button onClick={() => navigate("/")} className="home-btn primary-btn">Return to Shop</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
