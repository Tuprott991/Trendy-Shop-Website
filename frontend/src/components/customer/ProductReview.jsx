import React from "react";

const ProductReview = () => {
 return (
  <div className="flex flex-col items-center justify-center mt-12">
   <div className="text-xl font-bold text-gray-800 mb-2">Rating & Reviews</div>
   <div
    className="border border-gray-200 w-[80%] "
    style={{
     borderImage: "linear-gradient(to right, transparent, gray, transparent) 1",
    }}
   ></div>
  </div>
 );
};

export default ProductReview;
