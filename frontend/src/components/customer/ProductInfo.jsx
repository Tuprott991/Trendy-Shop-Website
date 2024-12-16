import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
 const { addToCart, isAddCartSuccessful, setIsAddCartSuccessful } =
  useContext(CartContext);
 const [selectedSize, setSelectedSize] = useState("S");
 const [selectQuantity, setSelectQuantity] = useState(1);
 const [isLoading, setIsLoading] = useState(false);
 const handleSelectSize = (size) => {
  setSelectedSize(size);
 };
 const renderStars = (rating) => {
  const maxStars = 5;
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
 const handleCart = async () => {
  setIsLoading(true);
  await new Promise((resolve) => {
   setTimeout(resolve, 2000);
  });
  addToCart({ ...product, size: selectedSize, quantity: selectQuantity });
  setIsLoading(false);
  setIsAddCartSuccessful(true);
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
     <div className="flex justify-center text-xl gap-8 rounded-full bg-gray-200 py-2 w-fit px-2 items-center">
      <button
       className="hover:bg-gray-300 rounded-full p-3 flex items-center justify-center"
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
     <button
      className="bg-green-500 text-white flex justify-center  hover:ring ring-green-300 hover:bg-green-600 transition-colors font-bold text-lg w-full py-4 rounded-full"
      onClick={handleCart}
     >
      Add to cart
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
     </button>
    </div>
   </div>
  </div>
 );
};

export default ProductInfo;
