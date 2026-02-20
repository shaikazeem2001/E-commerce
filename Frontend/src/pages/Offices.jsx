import React, { useEffect, useRef } from 'react';
import './css/Offices.css';
import gsap from 'gsap';

const Offices = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <div className="offices-container">
            <div className="offices-bg"></div>
            <div className="offices-overlay">
                <div className="offices-content" ref={contentRef}>
                    <h1>Our Global Presence</h1>
                    <p>Where innovation meets craftsmanship. We operate from the heart of tech hubs to deliver the finest burger-inspired fashion.</p>

                    <div className="office-grid">
                        <div className="office-card">
                            <h3>New York</h3>
                            <p>123 Burger St, Manhattan</p>
                        </div>
                        <div className="office-card">
                            <h3>London</h3>
                            <p>45 Sizzle Ave, Soho</p>
                        </div>
                        <div className="office-card">
                            <h3>Tokyo</h3>
                            <p>8-bit Shibuya Crossing</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offices;
