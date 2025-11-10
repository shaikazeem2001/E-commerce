import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);

const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;
  return cart;
};

const Shopcontextprovider = (props) => {
  const [all_product, setall_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ✅ Track token so we can refetch cart on login/logout
  const [authToken, setAuthToken] = useState(localStorage.getItem("auth-token") || null);

  // Fetch all products
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setall_product(data))
      .catch((err) => console.error("❌ Fetch products error:", err));
  }, []);

  // Fetch cart whenever token changes
  useEffect(() => {
    if (!authToken) {
      setCartItems(getDefaultCart()); // reset cart if logged out
      return;
    }

    fetch("http://localhost:4000/getcart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": authToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("❌ Fetch cart error:", err));
  }, [authToken]);

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (authToken) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Backend response:", data))
        .catch((err) => console.error("❌ Add to cart error:", err));
    }
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (authToken) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      }).catch((err) => console.error("❌ Remove from cart error:", err));
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

  // ✅ Login and logout helpers for Navbar
  const login = (token) => {
    localStorage.setItem("auth-token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setAuthToken(null);
  };

  return (
    <Shopcontext.Provider
      value={{
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        authToken,
        login,
        logout,
      }}
    >
      {props.children}
    </Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
