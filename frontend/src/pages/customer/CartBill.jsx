import { useContext, useEffect, useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartBill = () => {
 const { cart } = useContext(CartContext);
 const navigate = useNavigate();
 const [summary, setSummary] = useState({
  subTotal: 0,
  discount: 0,
  deliveryFee: 0,
  total: 0,
 });

 useEffect(() => {
  if (!cart || cart.length === 0) return;

  const subTotal = cart.reduce(
   (acc, item) => acc + item.price * item.quantity,
   0
  );
  const discount = subTotal * 0.1;
  const deliveryFee = 100;
  const total = subTotal - discount + deliveryFee;

  setSummary({ subTotal, discount, deliveryFee, total });
 }, [cart]);
 const handleCheckout = () => {
  navigate("/customer/checkout");
 };
 if (!cart || cart.length === 0) {
  return <div>Your cart is empty.</div>;
 }

 return (
  <div className="mt-4 bg-white w-1/3 ml-4 py-4 rounded-lg flex flex-col px-6 shadow-lg">
   <div className="text-lg font-bold pb-4">Order summary</div>
   <div className="text-lg">
    <div className="flex justify-between mb-2">
     <span className="text-gray-600">Subtotal</span>
     <span className="font-bold">${Math.round(summary.subTotal)}</span>
    </div>
    <div className="flex justify-between mb-2">
     <span className="text-gray-600">Discount</span>
     <span className="text-red-500 font-bold">
      -${Math.round(summary.discount)}
     </span>
    </div>
    <div className="flex justify-between mb-2">
     <span className="text-gray-600">Delivery Fee</span>
     <span className="font-bold">${Math.round(summary.deliveryFee)}</span>
    </div>
    <div className="border border-gray-200 mb-2"></div>
    <div className="flex justify-between mb-2 text-xl">
     <span className="font-bold">Total</span>
     <span className="font-bold">${Math.round(summary.total)}</span>
    </div>
   </div>
   <div className="flex justify-start bg-gray-200 text-gray-500 w-full pl-6 py-2 rounded-full text-left mt-2 hover:cursor-pointer hover:bg-gray-300">
    Add code
   </div>
   <div
    className="flex  items-center justify-center  gap-2 bg-green-500 text-white text-center rounded-full w-full px-20 py-4 font-semibold hover:bg-green-600 hover:cursor-pointer mt-4"
    onClick={handleCheckout}
   >
    Go to checkout
    <CgArrowRight />
   </div>
  </div>
 );
};

export default CartBill;
