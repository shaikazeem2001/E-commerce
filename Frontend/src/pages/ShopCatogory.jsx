import React, { useContext } from "react";
import "../pages/css/Shopcatogory.css";
import { Shopcontext } from "../context/Shopcontext";
import sort_icon from "../assets/Assets/Frontend_Assets/sort_icon.png";
import Item from "../components/item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(Shopcontext);

  return (
    <div className="shopcategory">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1–12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img  src={sort_icon} alt="dropdown" />
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.catogory === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
