import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        const onMouseOver = (e) => {
            // Check if target is a text-hoverable element
            if (e.target.closest('.text-hover')) {
                setIsHovering(true);
                e.target.closest('.text-hover').classList.add('is-active');
            }
        };

        const onMouseOut = (e) => {
            if (e.target.closest('.text-hover')) {
                setIsHovering(false);
                e.target.closest('.text-hover').classList.remove('is-active');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    useEffect(() => {
        if (isHovering) {
            gsap.to(cursorRef.current, {
                scale: 4,
                backgroundColor: "rgba(250, 0, 0, 0.2)", // light blue
                borderColor: "rgba(59, 130, 246, 0.5)",
                duration: 0.3
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 0.2,
                backgroundColor: "var(--primary-color)",
                borderColor: "var(--primary-color)",
                duration: 0.3
            });
        }
    }, [isHovering]);

    return (
        <div className="custom-cursor" ref={cursorRef}></div>
    );
};

export default CustomCursor;
