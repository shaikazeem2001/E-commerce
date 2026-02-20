import React, { useEffect, useRef } from 'react';
import './css/About.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const sections = sectionRef.current.querySelectorAll('.about-section');
        sections.forEach(section => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <div className="about-container" ref={sectionRef}>
            <div className="about-hero about-section">
                <h1>Crafting the Future of Fashion</h1>
                <p>Born from a passion for design and a love for quality, Trend is more than a brand—it's a movement.</p>
            </div>

            <div className="about-history about-section">
                <div className="about-content-split">
                    <div className="text-box">
                        <h2>Our History</h2>
                        <p>Founded in 2024, we started as a small boutique with a big vision. Today, we serve thousands of customers worldwide, staying true to our roots of excellence and bold aesthetics.</p>
                    </div>
                    <div className="image-placeholder-modern"></div>
                </div>
            </div>

            <div className="about-team about-section">
                <h2>The Dream Team</h2>
                <div className="team-grid">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="team-card">
                            <div className="team-avatar"></div>
                            <h3>Team Member {i}</h3>
                            <p>Creative Lead</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-future about-section">
                <h2>Our Vision</h2>
                <p>We're just getting started. From sustainable manufacturing to AR shopping experiences, the future of fashion is here.</p>
            </div>
        </div>
    );
};

export default About;
