import React, { useState } from 'react';
import './css/Contact.css';
import { Send } from '../components/Icons';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! Azeem will get back to you soon. 🚀');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Hi, I am Azeem</h1>
                <p>I'm the lead developer behind Trend. I’d love to hear your feedback or discuss how we can work together to build something extraordinary.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>How can I help?</label>
                    <textarea
                        rows="5"
                        placeholder="Write your message here..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                </div>
                <button type="submit" className="send-btn">
                    Send <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default Contact;
