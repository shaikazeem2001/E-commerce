import React, { useContext } from "react";
import "./CartItems.css";
import { Shopcontext } from "../../context/Shopcontext";
import remove_icon from "../../assets/Assets/Frontend_Assets/remove_icon.png";

const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(Shopcontext); // Make sure names match

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format ">
                <img src={e.image} alt={e.name} className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  alt="Remove"
                  onClick={() => removeFromCart(e.id)}
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null; 
      })}
      <div className="cartitems-down">
        <div className="catritems-total">
            <h1>Cart Total</h1>
            <div>
                <div className="catitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr />
                  <div className="cartitems-total-items">
                    <p>Total</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
            </div>
            <button>Proceed To Checkout</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have promo code,Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder="Enter PromoCode" name="" id="" />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
