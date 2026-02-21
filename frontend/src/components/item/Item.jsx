import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import ProgressiveImage from "../Skeleton/ProgressiveImage";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <ProgressiveImage
          src={props.image}
          alt={props.name}
          skeletonHeight="380px"
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
