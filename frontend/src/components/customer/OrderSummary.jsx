import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { CgArrowRight } from "react-icons/cg";

const OrderSummary = ({ isFormComplete }) => {
 const { cart } = useContext(CartContext);
 const [paymentMethod, setPaymentMethod] = useState("bank"); // Track selected payment method
 const [isBankActive, setIsBankActive] = useState(true); // Track if banks are active
 const [choosenBank, setChoosenBank] = useState("tpbank");
 const [discount, setDiscount] = useState(50);
 const [delivery, setDelivery] = useState(30);
 const [isLoading, setIsLoading] = useState(false);
 const [isAbleSubmit, setIsAbleSubmit] = useState(true);
 const [checkoutMessage, setCheckoutMessage] = useState(null);
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
 const divRef = useRef(null);
 const notiRef = useRef(null);
 const handleCheckout = async () => {
  if (!isFormComplete) {
   setIsAbleSubmit(false);
   return;
  }
  setIsLoading(true);
  await new Promise((resolve) => {
   setTimeout(resolve, 2000);
  });
  //   API TO CHECKOUT
  setIsLoading(false);
  setCheckoutMessage("Order placed successfully");
 };
 useEffect(() => {
  const handleClickOutside = (event) => {
   if (divRef.current && !divRef.current.contains(event.target)) {
    setIsAbleSubmit(true);
    setCheckoutMessage(null);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [isAbleSubmit, setIsAbleSubmit]);
 console.log("isAbleSubmit", isAbleSubmit);
 const subtotal = cart.reduce(
  (total, item) => total + Math.round(item.price, 2) * item.quantity,
  0
 );
 return (
  <>
   {(!isAbleSubmit || checkoutMessage) && (
    <div className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"></div>
   )}
   <div className="px-6 py-5">
    {!isAbleSubmit && (
     <div
      ref={divRef}
      className="shadow-lg ring-1 ring-black/5 rounded-lg fixed z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-fit border pr-8 pl-4 py-2 space-y-2 bg-white text-left font-medium text-sm"
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
    {checkoutMessage && (
     <div
      ref={divRef}
      className=" shadow-lg ring-1 ring-black/5 rounded-lg fixed z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-fit border  py-4 space-y-2 bg-white font-medium text-sm"
     >
      <div className="text-center pt-3 pb-2 flex flex-col justify-center items-center px-8 text-lg">
       <img src="/navigation.png" className="w-52 h-52" alt="123" />
       <p>Your order has been placed successfully!</p>
       <p>The retailer is now reviewing it.</p>
      </div>

      <div className="flex justify-center items-center pb-2 text-lg">
       <div
        ref={notiRef}
        className="text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700 "
        onClick={() => setCheckoutMessage(null)}
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
      <div className="text-red-600 ">-${discount}</div>
     </div>
     <div className="flex justify-between w-full mt-4  font-bold">
      <div className="text-gray-500">Delivery Fee</div>
      <div>${delivery}</div>
     </div>
    </div>
    <div className="border-b-2 border-gray-200 pt-4"></div>
    <div className="text-2xl flex justify-between w-full mt-4  font-bold">
     <div>Total</div>
     <div className="">${subtotal - discount + delivery}</div>
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
     {isLoading && (
      <div role="status">
       <svg
        aria-hidden="true"
        className="ml-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
       >
        <path
         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
         fill="currentColor"
        />
        <path
         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
         fill="currentFill"
        />
       </svg>
      </div>
     )}
    </div>
   </div>
  </>
 );
};

export default OrderSummary;
