import React, { useEffect, useState, useRef } from "react";
import "./Newcollections.css";
import Item from "../item/Item";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import api from "../../api/axios";

gsap.registerPlugin(ScrollTrigger);

const Newcollections = () => {
  const [new_collections, setNew_collections] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    api.get('/newcollections')
      .then((res) => setNew_collections(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (new_collections.length > 0) {
      gsap.fromTo(sectionRef.current.children,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [new_collections]);
  return (
    <div>
      <div className="new-collections container">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections" ref={sectionRef}>
          {new_collections.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Newcollections;
