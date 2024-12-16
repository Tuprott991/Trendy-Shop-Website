import { createContext, useEffect } from "react";
import { useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]);
 const [isAddCartSuccessful, setIsAddCartSuccessful] = useState(false);
 useEffect(() => {
  const cart = localStorage.getItem("cart");
  if (cart) {
   setCart(JSON.parse(cart));
  }
 }, []);
 const addToCart = (product) => {
  const existProduct = cart.find(
   (item) => item._id === product._id && item.size === product.size
  );

  if (existProduct) {
   const updatedCart = cart.map((item) =>
    item._id === product._id && item.size === product.size
     ? { ...item, quantity: item.quantity + product.quantity }
     : item
   );

   setCart(updatedCart);
   localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
   const updatedCart = [...cart, { ...product, quantity: product.quantity }];
   setCart(updatedCart);
   localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
 };
 return (
  <CartContext.Provider
   value={{ cart, addToCart, isAddCartSuccessful, setIsAddCartSuccessful }}
  >
   {children}
  </CartContext.Provider>
 );
};
