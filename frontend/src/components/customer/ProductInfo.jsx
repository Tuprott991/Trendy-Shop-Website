import React, { useState } from "react";

const ProductInfo = ({ product }) => {
 const [selectedSize, setSelectedSize] = useState("S");
 const [selectQuantity, setSelectQuantity] = useState(1);
 const handleSelectSize = (size) => {
  setSelectedSize(size);
 };
 const renderStars = (rating) => {
  const maxStars = 5; // Maximum stars to display
  return [...Array(maxStars)].map((_, i) => (
   <span
    key={i}
    className={`${
     i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
    } text-3xl`}
   >
    ★
   </span>
  ));
 };
 console.log(product);
 return (
  <div className="flex items-center gap-8 mx-40 px-20  py-8 bg-white rounded-3xl ">
   <div className="w-[50%] h-[20%] overflow-hidden rounded-2xl flex justify-center items-center border  shadow-lg">
    <img
     className=" object-cover  "
     src={product.image_url}
     alt={product.name}
    />
   </div>
   <div className="px-4 flex flex-col gap-2 self-start min-w-[60%]">
    <div className="font-semibold text-3xl ">{product.name}</div>
    <div className="flex  gap-1 items-center mt-8">
     {renderStars(product.rating)}
     <div className="text-sm ml-2 text-gray-600 text-center">
      {product.rating} / 5
     </div>
    </div>
    <div className="font-bold text-3xl flex gap-4">
     {product.discount && (
      <div className="text-red-500">
       ${Math.round(product.price - (product.price * product.discount) / 100)}
      </div>
     )}
     <div className={`${product.discount ? "line-through text-gray-400" : ""}`}>
      ${product.price}
     </div>
     {product.discount && (
      <div className="text-sm rounded-2xl px-4 py-2 bg-red-100 text-red-500">
       -{product.discount}%
      </div>
     )}
    </div>
    <div className="mt-8">
     <div className="text-gray-600 font-semibold mb-4">Choose Size</div>
     <div className="flex gap-3">
      {["S", "M", "L"].map((size) => (
       <div
        key={size}
        className={`px-8 py-3 text-lg cursor-pointer rounded-3xl font-bold  transition-colors	 ${
         selectedSize === size
          ? "bg-green-500 text-white "
          : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => handleSelectSize(size)}
       >
        {size}
       </div>
      ))}
     </div>
    </div>
    <div className="border border-gray-200 mt-4"></div>
    <div className="flex items-center gap-2 mt-4">
     <div className="flex text-xl gap-8 rounded-full bg-gray-200 py-2 w-fit px-2 items-center">
      <button
       className="hover:bg-gray-300 rounded-full p-3"
       onClick={() => setSelectQuantity((prev) => Math.max(prev - 1, 1))}
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
      <span className="font-bold">{selectQuantity}</span>
      <button
       className="hover:bg-gray-300 rounded-full p-3  "
       onClick={() => setSelectQuantity((prev) => prev + 1)}
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
     <button className="bg-green-500 text-white  hover:ring ring-green-300 hover:bg-green-600 transition-colors font-bold text-lg w-full py-4 rounded-full">
      Add to cart
     </button>
    </div>
   </div>
  </div>
 );
};

export default ProductInfo;
