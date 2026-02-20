import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import CartItems from "../components/cartitems/CartItems";

const Cart = () => {
  const { cartItems, all_product, removeFromCart, getTotalCartAmount } =
    useContext(Shopcontext);

  return (
    <>
    <CartItems/>
    </>
  );
};

export default Cart;
