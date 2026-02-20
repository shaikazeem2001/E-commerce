import React, { useEffect, useRef } from "react";
import "./Hero.css";
import hand_icon from "../assets/hand_icon.png";
import arrow_icon from '../assets/arrow.png'
import hero_img from '../assets/hero_image.png'
import AnimatedText from "../AnimatedText";
import { Link } from "react-router-dom";
import gsap from "gsap";
const Hero = () => {
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(leftRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    )
      .fromTo(rightRef.current,
        { opacity: 0, scale: 0.8, x: 100 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2 },
        "-=0.8"
      );

    // Floating animation
    gsap.to(rightRef.current, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.2
    });
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-left" ref={leftRef}>
        <h2><AnimatedText text="NEW ARRIVALS ONLY" /></h2>
        <div className="hero-text-container">
          <div className="hero-hand-icon">
            <p><AnimatedText text="new" /></p>
            <img src={hand_icon} alt="Hand Icon" />
          </div>
          <p><AnimatedText text="collections" /></p>
          <p><AnimatedText text="foreveryone" /></p>
        </div>
        <div className="hero-latest-btn">
          <Link to='/mens'> <div className="text-hover">Latest Collection</div></Link>
          <img src={arrow_icon} alt="Arrow Icon" />
        </div>
      </div>
      <div className="hero-right" ref={rightRef}>
        <img src={hero_img} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;
