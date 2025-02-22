import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { CgTrash } from "react-icons/cg";
import { DropdownContext } from "../../context/DropDownContext";
import CartBill from "./CartBill";
const CustomerCart = () => {
 const { cart, changeCart } = useContext(CartContext);
 const { isQuantity, setIsQuantity } = useContext(DropdownContext);
 const [chosenItem, setChosenItem] = useState();
 const [message, setMessage] = useState();
 const [discountCart, setDiscountCart] = useState(cart);
 const handleDiscountCart = (newCart) => {
  console.log(newCart);
  setDiscountCart(newCart);
 };

 const divRef = useRef(null);
 const notiRef = useRef(null);
 useEffect(() => {
  const handleClickOutside = (event) => {
   if (divRef.current && !divRef.current.contains(event.target)) {
    setIsQuantity(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [isQuantity, setIsQuantity]);
 if (!cart || cart.length === 0) {
  return (
   <div className="bg-gray-100 h-screen">
    <div className="px-12 pt-6">
     <div className="text-2xl font-bold ">Your cart is empty</div>
    </div>
   </div>
  );
 }
 const setSelectQuantity = async (item, type) => {
  if (type === "increment") {
   if (item.quantity + 1 == item.stock_quantity) {
    setChosenItem(item);
    setIsQuantity(true);
    setMessage("increment");
   } else {
    item.quantity += 1;
   }
  } else {
   if (item.quantity === 1) {
    setChosenItem(item);
    setIsQuantity(true);
    setMessage("decrement");
   } else {
    item.quantity -= 1;
   }
  }
  const updatedCart = cart.map((cartItem) => {
   if (cartItem._id === item._id && cartItem.size === item.size) {
    return { ...cartItem, quantity: item.quantity };
   }
   return cartItem;
  });
  changeCart(updatedCart);
 };
 const handleRemoveItem = () => {
  if (message == "increment") {
   setIsQuantity(false);
   return;
  }
  const updatedCart = cart.filter(
   (cartItem) =>
    cartItem._id !== chosenItem._id || cartItem.size !== chosenItem.size
  );
  setIsQuantity(false);
  changeCart(updatedCart);
 };
 const handleRemoveItemButton = (item) => {
  return () => {
   setChosenItem(item);
   setMessage("decrement");

   setIsQuantity(true);
  };
 };
 console.log(discountCart);
 return (
  <>
   {isQuantity && (
    <div
     className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"
     onClick={() => setIsQuantity((prev) => !prev)}
    ></div>
   )}
   <div className="bg-gray-100 min-h-screen">
    {isQuantity && (
     <div className="shadow-lg ring-1 ring-black/5 rounded-lg fixed z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-fit border pr-8 pl-4 py-2 space-y-2 bg-white text-left font-medium text-sm">
      <div className="text-left pr-16 pt-3 pb-2">
       {message == "decrement" ? "Remove item" : "Over available stock"}
      </div>
      <div className="border border-gray-200 w-[100%]"></div>
      <div className="text-left pr-16 pt-3 pb-2">
       {message == "decrement"
        ? "The item will be removed from your cart"
        : "Your item quantity is over available stock"}
      </div>

      <div className="flex justify-end items-center pb-2">
       {message == "decrement" && (
        <div
         ref={notiRef}
         className="text-gray-400 hover:text-red-500 mr-4 cursor-pointer"
         onClick={() => setIsQuantity(false)}
        >
         Cancel
        </div>
       )}
       <div
        className="text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700"
        onClick={handleRemoveItem}
       >
        Ok
       </div>
      </div>
     </div>
    )}
    <div className="px-14 pt-6">
     <div className="text-2xl font-bold ">Your cart</div>

     <div className="flex items-start justify-between ">
      <div className="bg-white w-2/3 mt-4 mb-12 rounded-lg">
       <div className="px-12 py-2">
        {discountCart.map((item) => (
         <div
          key={`${item._id}+${item.size}`}
          className="flex justify-between border-b-2 border-gray-200 py-4"
         >
          <div className="flex">
           <img
            src={item.image_url}
            alt={item.name}
            className="w-24 h-24 px-1 py-1 object-cover border borde-gray-200 rounded-lg"
           />
           <div className="ml-4 flex flex-col justify-between">
            <div className="">
             <div className="font-semibold">{item.name}</div>
             <div className="text-sm">Size: {item.size}</div>
            </div>
            <div className="flex gap-2">
             <div
              className={`text-lg font-bold ${
               item.discounted_price && "text-gray-600 line-through"
              }`}
             >
              ${Math.round(item.price * item.quantity)}
             </div>
             {item.discounted_price && (
              <div className="text-lg font-bold text-red-600">
               ${Math.round(item.discounted_price * item.quantity)}
              </div>
             )}
            </div>
           </div>
          </div>
          <div className="flex flex-col justify-between items-end">
           <CgTrash
            color="red"
            size={24}
            className="hover:cursor-pointer"
            onClick={handleRemoveItemButton(item)}
           />
           <div className="flex justify-center  gap-4 rounded-full bg-gray-200  items-center">
            <button
             className="hover:bg-gray-300 rounded-full p-3 flex items-center justify-center"
             onClick={() => setSelectQuantity(item, "decrement")}
            >
             <svg
              className="w-4 h-4 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
             >
              <path
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M1 1h16"
              />
             </svg>
            </button>
            <span className="font-bold">{item.quantity}</span>
            <button
             className="hover:bg-gray-300 rounded-full p-3  "
             onClick={() => setSelectQuantity(item, "increment")}
            >
             <svg
              className="w-4 h-4 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
             >
              <path
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M9 1v16M1 9h16"
              />
             </svg>
            </button>
           </div>
          </div>
         </div>
        ))}
       </div>
      </div>
      <CartBill onCartChange={handleDiscountCart}></CartBill>
     </div>
    </div>
   </div>
  </>
 );
};

export default CustomerCart;
