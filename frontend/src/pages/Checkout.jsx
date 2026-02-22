import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Loader2 } from "../components/Icons";
import "./css/Checkout.css";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Shopcontext } from "../context/Shopcontext";

const Checkout = () => {
    const { getTotalCartAmount, cartItems, all_product } = useContext(Shopcontext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'canceled'
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: ""
    });

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            setStep(3);
            setPaymentStatus('success');
        }
        if (query.get("canceled")) {
            setPaymentStatus('canceled');
            toast.error("Payment canceled. You can try again.");
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare products for Stripe
            const productsToPay = Object.keys(cartItems).filter(itemId => cartItems[itemId] > 0).map(itemId => {
                const item = all_product.find(p => p.id === Number(itemId));
                return {
                    ...item,
                    quantity: cartItems[itemId]
                };
            });

            const response = await api.post('/api/payment/create-checkout-session', {
                products: productsToPay
            });

            if (response.data.success && response.data.url) {
                // Redirect to Stripe Checkout
                window.location.href = response.data.url;
            } else {
                toast.error("Failed to initiate payment. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Something went wrong with the payment system.");
            setLoading(false);
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
                    <div className="checkout-form card">
                        <button type="button" className="text-btn back-btn" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                        <h1><CreditCard /> Payment Method</h1>
                        <p className="payment-desc">You will be redirected to Stripe's secure payment gateway to complete your purchase.</p>

                        <div className="payment-methods">
                            <div className="payment-method active">
                                <CreditCard size={24} />
                                <span>Credit / Debit Card (Stripe)</span>
                                <div className="payment-icons">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" />
                                </div>
                            </div>
                        </div>

                        <div className="order-summary card shadow-none bg-surface">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <p>Subtotal:</p>
                                <span>${getTotalCartAmount()}</span>
                            </div>
                            <div className="summary-row">
                                <p>Shipping:</p>
                                <span>Free</span>
                            </div>
                            <hr />
                            <div className="summary-row total">
                                <p>Total:</p>
                                <span>${getTotalCartAmount()}</span>
                            </div>
                        </div>

                        <button onClick={handlePayment} className="pay-btn primary-btn" disabled={loading}>
                            {loading ? <Loader2 className="spinner" /> : `Proceed to Payment ($${getTotalCartAmount()})`}
                        </button>

                        <div className="secure-badge">
                            <ShieldCheck size={16} /> Secure Encrypted Payment via Stripe
                        </div>
                    </div>
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
