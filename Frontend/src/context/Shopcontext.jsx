import React, { createContext, useState } from "react";
import all_product from "../assets/Assets/Frontend_Assets/all_product";

export const Shopcontext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const Shopcontextprovider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  React.useEffect(() => {
    setCartItems(getDefaultCart());
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let product = all_product.find((p) => p.id === Number(item));
        totalAmount += product.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <Shopcontext.Provider value={contextValue}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
