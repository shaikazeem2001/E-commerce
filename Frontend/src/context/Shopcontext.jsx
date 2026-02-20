import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const Shopcontext = createContext(null);

const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;
  return cart;
};

const Shopcontextprovider = (props) => {
  const [all_product, setall_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check auth status on mount
  const checkAuth = async () => {
    try {
      const response = await api.get('/check-auth');
      if (response.data.success) {
        setIsLoggedIn(true);
        fetchCart();
      }
    } catch (err) {
      // 401 is expected if not logged in; don't clutter the console with an error
      if (err.response?.status !== 401) {
        console.error("Auth check failed:", err);
      }
      setIsLoggedIn(false);
      setCartItems(getDefaultCart());
    }
  };

  // Fetch all products
  useEffect(() => {
    api.get('/allproducts')
      .then((res) => setall_product(res.data))
      .catch((err) => console.error("❌ Fetch products error:", err));

    checkAuth();
  }, []);

  const fetchCart = () => {
    api.post('/getcart', {})
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("❌ Fetch cart error:", err));
  };

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (isLoggedIn) {
      api.post('/addtocart', { itemId })
        .then((res) => console.log("✅ Backend response:", res.data))
        .catch((err) => console.error("❌ Add to cart error:", err));
    }
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (isLoggedIn) {
      api.post('/removefromcart', { itemId })
        .catch((err) => console.error("❌ Remove from cart error:", err));
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find((p) => p.id === Number(item));
        if (product) total += product.new_price * cartItems[item];
      }
    }
    return total;
  };

  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <Shopcontext.Provider
      value={{
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        isLoggedIn,
        setIsLoggedIn,
        checkAuth
      }}
    >
      {props.children}
    </Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
