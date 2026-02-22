import React, { useEffect, useRef } from 'react'
import './Offers.css'
import exculsive_image from '../assets/exclusive_image.png'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Offers = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(leftRef.current.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 }
    )
      .fromTo(rightRef.current,
        { opacity: 0, scale: 0.8, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1 },
        "-=0.6"
      );
  }, []);

  return (
    <div className='offers-section'>
      <div className="offers container" ref={sectionRef}>
        <div className="offers-left" ref={leftRef}>
          <h1>Exclusive</h1>
          <h1>Offers for you</h1>
          <p>ONLY FOR BEST SELLERS PRODUCTS</p>
          <button className="offers-btn">Check Now</button>
        </div>
        <div className="offers-right" ref={rightRef}>
          <img src={exculsive_image} alt="Exclusive Offers" />
        </div>
      </div>
    </div>
  )
}

export default Offers
