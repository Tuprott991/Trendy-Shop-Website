import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { CgArrowRight } from "react-icons/cg";

const OrderSummary = ({ isFormComplete }) => {
 const { cart } = useContext(CartContext);
 const [paymentMethod, setPaymentMethod] = useState("bank"); // Track selected payment method
 const [isBankActive, setIsBankActive] = useState(true); // Track if banks are active
 const [choosenBank, setChoosenBank] = useState("tpbank");
 const handlePaymentMethodChange = (event) => {
  const selectedValue = event.target.value;
  setPaymentMethod(selectedValue);

  if (selectedValue === "bank") {
   setIsBankActive(true);
   setChoosenBank("tpbank");
  } else {
   setIsBankActive(false);
   setChoosenBank(null);
  }
 };
 const handleChooseBank = (event) => {
  const bankValue = event.target.getAttribute("data-bank");
  console.log(bankValue);
  setChoosenBank(bankValue);
 };
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
 const subtotal = cart.reduce(
  (total, item) => total + Math.round(item.price, 2) * item.quantity,
  0
 );
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
    <div className="flex flex-wrap">
     <div className="flex justify-between w-full mt-4  font-bold">
      <div className="text-gray-500">Subtotal</div>
      <div>${Math.round(subtotal, 2)}</div>
     </div>
     <div className="flex justify-between w-full mt-4  font-bold">
      <div className="text-gray-500">Discount</div>
      <div className="text-red-600 ">-${123}</div>
     </div>
     <div className="flex justify-between w-full mt-4  font-bold">
      <div className="text-gray-500">Delivery Fee</div>
      <div>$30</div>
     </div>
    </div>
    <div className="border-b-2 border-gray-200 pt-4"></div>
    <div className="text-2xl flex justify-between w-full mt-4  font-bold">
     <div>Total</div>
     <div className="">$30</div>
    </div>
    <div className="flex flex-col justify-center mt-5 gap-4">
     <div className="flex items-center justify-between">
      <div className="flex items-center">
       <input
        type="checkbox"
        id="bank"
        name="bank"
        value="bank"
        className="mr-4  w-5 h-5 "
        checked={paymentMethod === "bank"}
        onChange={handlePaymentMethodChange}
       />
       <label htmlFor="bank">Bank</label>
      </div>
      <div className="flex gap-4 ">
       <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9Cpp1nDLbzIrK_-ljQsqJOGbytIiiDAgmQ&s"
        data-bank="tpbank"
        onClick={handleChooseBank}
        className={`${
         !isBankActive ? "opacity-50" : "cursor-pointer hover:ring-2"
        } w-12 h-12 rounded border-2 border-gray-200 ${
         choosenBank === "tpbank" ? "ring-2 ring-green-800" : ""
        }`}
       />
       <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbEnmjjKXOTObZ4YOqqpbcVtJjNwREceuzA&s"
        data-bank="mbbank"
        onClick={handleChooseBank}
        className={`${
         !isBankActive ? "opacity-50" : "cursor-pointer hover:ring-2"
        } w-12 h-12 rounded border-2 border-gray-200 ${
         choosenBank === "mbbank" ? "ring-2 ring-green-800" : ""
        }`}
       />
       <img
        src="https://seeklogo.com/images/A/agribank-logo-1CEEE70C76-seeklogo.com.png"
        data-bank="argibank"
        onClick={handleChooseBank}
        className={`${
         !isBankActive ? "opacity-50" : "cursor-pointer hover:ring-2"
        } w-12 h-12 rounded border-2 border-gray-200 ${
         choosenBank === "argibank" ? "ring-2 ring-green-800" : ""
        }`}
       />
       <img
        src="https://i.pinimg.com/564x/0e/33/49/0e3349ab85ae5ebf604df3cb380f9c8f.jpg"
        data-bank="vietinbank"
        onClick={handleChooseBank}
        className={`${
         !isBankActive ? "opacity-50" : "cursor-pointer hover:ring-2"
        } w-12 h-12 rounded border-2 border-gray-200 ${
         choosenBank === "vietinbank" ? "ring-2 ring-green-800" : ""
        }`}
       />
      </div>
     </div>
     <div className="flex items-center">
      <input
       type="checkbox"
       id="cash"
       name="cash"
       value="cash"
       className="mr-4  w-5 h-5 "
       checked={paymentMethod === "cash"}
       onChange={handlePaymentMethodChange}
      />

      <label htmlFor="cash">Cash on delivery</label>
     </div>
    </div>
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
