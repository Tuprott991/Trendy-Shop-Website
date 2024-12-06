import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
 const navigate = useNavigate();
 const renderStars = (rating) => {
  const maxStars = 5; // Maximum stars to display
  return [...Array(maxStars)].map((_, i) => (
   <span
    key={i}
    className={`${
     i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
    } text-2xl`}
   >
    ★
   </span>
  ));
 };
 const handleOnClick = () => {
  navigate(`/customer/product/${product._id}`);
 };
 return (
  <div
   className="cursor-pointer flex border-2 flex-col gap-2 bg-white rounded-lg pb-4 border-slate-200 hover:border-green-600 shadow-lg"
   onClick={handleOnClick}
  >
   <div className="overflow-hidden rounded-md flex justify-center items-center">
    <img
     className="w-[70%] h-[70%] object-cover  "
     src={product.image_url}
     alt={product.name}
    />
   </div>
   <div className="px-4 flex flex-col gap-2 ">
    <div className="font-semibold text-lg ">{product.name}</div>
    <div className="flex  gap-1 items-center">
     {renderStars(product.rating)}
     <div className="text-sm ml-2 text-gray-600 text-center">
      {product.rating} / 5
     </div>
    </div>
    <div className="font-bold text-xl flex gap-4">
     {/* Original Price with optional strikethrough */}
     <div className={`${product.discount ? "line-through text-gray-500" : ""}`}>
      ${product.price}
     </div>

     {/* Discounted Price */}
     {product.discount && (
      <div className="text-red-500">
       ${Math.round(product.price - (product.price * product.discount) / 100)}
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default ProductCard;
