import React, { useRef } from 'react';
import gsap from 'gsap';

const AnimatedText = ({ text, className }) => {
    const containerRef = useRef(null);

    const onMouseEnter = () => {
        const letters = containerRef.current.querySelectorAll('.letter');
        gsap.to(letters, {
            y: -10,
            rotationX: 360,
            opacity: 0.1,
            duration: 0.5,
            stagger: 0.03,
            ease: "back.in(100)",
            overwrite: true,
        });

        gsap.to(letters, {
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "elastic.out(1, 0.3)",
            delay: 0.1,
        });
    };

    const onMouseLeave = () => {
        const letters = containerRef.current.querySelectorAll('.letter');
        gsap.to(letters, {
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.01,
            ease: "power2.out",
            overwrite: true
        });
    };

    return (
        <span
            ref={containerRef}
            className={`text-hover ${className || ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ display: 'inline-block', cursor: 'pointer' }}
        >
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="letter"
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                        perspective: '1000px'
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default AnimatedText;
