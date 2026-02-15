import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Loader2 } from "../components/Icons";
import "./CSS/Checkout.css";

const Checkout = () => {
    const { getTotalCartAmount } = useContext(Shopcontext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    if (getTotalCartAmount() <= 0 && step !== 3) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate("/")}>Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-steps">
                <div className={`step ${step >= 1 ? "active" : ""}`}>1. Shipping</div>
                <div className={`step ${step >= 2 ? "active" : ""}`}>2. Payment</div>
                <div className={`step ${step >= 3 ? "active" : ""}`}>3. Success</div>
            </div>

            {step === 1 && (
                <form className="checkout-form" onSubmit={handleNextStep}>
                    <h1><Truck /> Shipping Details</h1>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Burger St" />
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="New York" />
                        </div>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} placeholder="10001" />
                        </div>
                    </div>
                    <button type="submit" className="next-btn">Continue to Payment</button>
                </form>
            )}

            {step === 2 && (
                <form className="checkout-form" onSubmit={handlePayment}>
                    <button type="button" className="back-btn" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                    <h1><CreditCard /> Payment Information</h1>
                    <div className="payment-icons">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" />
                        <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" />
                    </div>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleInputChange} placeholder="**** **** **** ****" />
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" name="expiry" required value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input type="password" name="cvv" required value={formData.cvv} onChange={handleInputChange} placeholder="***" />
                        </div>
                    </div>
                    <div className="order-summary">
                        <p>Order Total:</p>
                        <span>${getTotalCartAmount()}</span>
                    </div>
                    <button type="submit" className="pay-btn" disabled={loading}>
                        {loading ? <Loader2 className="spinner" /> : `Pay $${getTotalCartAmount()}`}
                    </button>
                    <div className="secure-badge">
                        <ShieldCheck size={16} /> Secure Encrypted Payment
                    </div>
                </form>
            )}

            {step === 3 && (
                <div className="checkout-success">
                    <div className="success-icon">✓</div>
                    <h1>Order Successful!</h1>
                    <p>Thank you for your purchase, {formData.fullName.split(' ')[0]}!</p>
                    <p>A confirmation email has been sent to {formData.email}.</p>
                    <button onClick={() => navigate("/")} className="home-btn">Return to Shop</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
