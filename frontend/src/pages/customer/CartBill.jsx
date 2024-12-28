import { useContext, useEffect, useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { voucherService } from "../../services/voucherService";
import { CgRemove } from "react-icons/cg";
const CartBill = ({ onCartChange }) => {
 const { cart } = useContext(CartContext);
 const [selectedCode, setSelectedCode] = useState("Add voucher"); // State for selected code
 const [showDropdown, setShowDropdown] = useState(false); // State for controlling dropdown visibility
 const [voucherList, setVoucherList] = useState([]);
 const [discountCart, setDiscountCart] = useState(cart);
 useEffect(() => {
  const fetchVouchers = async () => {
   const retailerList = [...new Set(cart.map((item) => item.user_id))];
   const response = await voucherService.getVoucherList(retailerList);
   if (response.status === 404) {
    setVoucherList(null);
    setSelectedCode("No voucher available");
   } else {
    const sortedVouchers = response.data.vouchers
     .sort((a, b) => b.discount_value - a.discount_value)
     .slice(0, 5);
    setVoucherList(sortedVouchers);
   }
  };
  fetchVouchers();
 }, [cart]);
 useEffect(() => {
  const fetchDiscount = async () => {
   if (selectedCode === "Add voucher") {
    setDiscountCart(cart);
    onCartChange(cart);
   } else {
    const response = await voucherService.getVoucherDiscount(
     cart,
     selectedCode
    );
    setDiscountCart(response.data.products);
    onCartChange(response.data.products);
   }
  };
  fetchDiscount();
 }, [selectedCode, cart]);
 const handleSelectCode = (code) => {
  setSelectedCode(code);
  setShowDropdown(false);
 };
 const navigate = useNavigate();
 const [summary, setSummary] = useState({
  subTotal: 0,
  discount: 0,
  deliveryFee: 0,
  total: 0,
 });

 useEffect(() => {
  if (!discountCart || discountCart.length === 0) return;

  const subTotal = discountCart.reduce(
   (acc, item) => acc + item.price * item.quantity,
   0
  );
  const discounted = discountCart.reduce((acc, item) => {
   if (item.discounted_price) {
    return acc + item.discounted_price * item.quantity;
   } else {
    return acc + item.price * item.quantity;
   }
  }, 0);
  const discount = subTotal - discounted;
  const deliveryFee = 25;
  const total = subTotal - discount + deliveryFee;

  setSummary({ subTotal, discount, deliveryFee, total });
 }, [discountCart]);
 const handleCheckout = () => {
  navigate("/customer/checkout");
 };
 if (!cart || cart.length === 0) {
  return <div>Your cart is empty.</div>;
 }
 const handleVoucherDropDown = () => {
  if (voucherList === null) return;
  setShowDropdown(!showDropdown);
 };

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
   <div className="relative">
    <div
     className="text-black flex justify-between items-center bg-gray-200  w-full pl-6 py-2 rounded-full text-left mt-2 hover:cursor-pointer hover:bg-gray-300"
     onClick={handleVoucherDropDown}
    >
     <div>{selectedCode ? selectedCode : "Add voucher"}</div>
     {selectedCode !== "Add voucher" && (
      <CgRemove
       className="hover:text-red-600 border hover:ring-2 rounded-full  mr-6 w-6 h-6 "
       onClick={(e) => {
        e.stopPropagation();
        setSelectedCode("Add voucher");
        setShowDropdown(false);
        return;
       }}
      />
     )}
    </div>

    {/* Conditional Dropdown */}
    {showDropdown && voucherList && (
     <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
      <ul className="space-y-2 text-black">
       <li
        onClick={() => handleSelectCode("Add voucher")}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
       >
        Add voucher
       </li>
       {voucherList.map((voucher) => (
        <li
         key={voucher._id}
         onClick={() => handleSelectCode(voucher.code)}
         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
         {voucher.code} {voucher.discount_value}%
        </li>
       ))}
      </ul>
     </div>
    )}
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
