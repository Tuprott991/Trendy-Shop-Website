import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { CgArrowRight } from "react-icons/cg";

const OrderSummary = ({ isFormComplete }) => {
 const { cart } = useContext(CartContext);
 const [isAbleSubmit, setIsAbleSubmit] = useState(true);
 const divRef = useRef(null);
 const notiRef = useRef(null);
 const handleCheckout = () => {
  if (!isFormComplete) {
   setIsAbleSubmit(false);
   return;
  }
 };
 useEffect(() => {
  const handleClickOutside = (event) => {
   if (divRef.current && !divRef.current.contains(event.target)) {
    console.log(1);
    setIsAbleSubmit(true);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [isAbleSubmit, setIsAbleSubmit]);
 console.log(isAbleSubmit);
 return (
  <>
   {!isAbleSubmit && (
    <div className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"></div>
   )}
   <div className="px-6 py-5">
    {!isAbleSubmit && (
     <div
      ref={divRef}
      className="shadow-lg ring-1 ring-black/5 rounded-lg absolute z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-fit border pr-8 pl-4 py-2 space-y-2 bg-white text-left font-medium text-sm"
     >
      <div className="text-left pr-16 pt-3 pb-2">Incomplete information</div>
      <div className="border border-gray-200 w-[100%]"></div>
      <div className="text-left pr-16 pt-3 pb-2">
       You have to fill in all the information to place an order
      </div>

      <div className="flex justify-end items-center pb-2">
       <div
        ref={notiRef}
        className="text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700"
        onClick={() => setIsAbleSubmit(true)}
       >
        Ok
       </div>
      </div>
     </div>
    )}
    <div className="text-lg font-bold">Order summary</div>
    {cart.map((item) => (
     <div
      key={`${item._id}+${item.size}`}
      className="flex justify-between border-b-2 border-gray-200 py-4"
     >
      <div className="flex">
       <img
        src={item.image_url}
        alt={item.name}
        className="w-16 h-16 px-1 py-1 object-cover border borde-gray-200 rounded-lg"
       />
       <div className="ml-4 flex justify-between">
        <div className="flex flex-col">
         <div className="font-semibold">{item.name}</div>
         <div className="mt-1">Quantity: {item.quantity}</div>
        </div>
       </div>
      </div>
      <div className="flex flex-col justify-between items-end">
       <div className="flex justify-center  gap-4 rounded-full font-bold  items-center">
        ${Math.round(item.price * item.quantity)}
       </div>
      </div>
     </div>
    ))}
    <div
     className="flex  items-center justify-center  gap-2 bg-green-500 text-white text-center rounded-full w-full px-20 py-4 font-semibold hover:bg-green-600 hover:cursor-pointer mt-4"
     onClick={handleCheckout}
    >
     Place order
     <CgArrowRight />
    </div>
   </div>
  </>
 );
};

export default OrderSummary;
