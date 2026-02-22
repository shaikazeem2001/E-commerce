import Item from "../item/Item";
import "./Popular.css";
import React, { useState, useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import api from "../../api/axios";

gsap.registerPlugin(ScrollTrigger);

const Popular = () => {
  const [popular, setpopular] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    api.get('/popularinwomen')
      .then((res) => setpopular(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (popular.length > 0) {
      gsap.fromTo(sectionRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [popular]);

  return (
    <div className="popular container">
      <h1>POPULAR IN WOMEN</h1>
      <hr className="title-hr" />

      <div className="popularitem" ref={sectionRef}>
        {popular.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
