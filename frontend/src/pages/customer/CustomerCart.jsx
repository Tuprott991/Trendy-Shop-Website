import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CustomerCart = () => {
 const { cart } = useContext(CartContext);
 console.log(cart);
 return <div>CustomerCart</div>;
};

export default CustomerCart;
