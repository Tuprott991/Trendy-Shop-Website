import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";

const ProductReview = () => {
 const params = useParams();

 const [feedback, setFeedback] = useState("");
 useEffect(() => {
  const fetchFeedback = async () => {
   const response = await productService.getProductFeedback(params.id);
   setFeedback(response.data);
  };
  fetchFeedback();
 }, [params.id]);
 console.log(feedback);
 return (
  <div className="flex flex-col items-center justify-center mt-12">
   <div className="text-xl font-bold text-gray-800 mb-2">Rating & Reviews</div>
   <div
    className="border border-gray-200 w-[80%] "
    style={{
     borderImage: "linear-gradient(to right, transparent, gray, transparent) 1",
    }}
   ></div>
   <div className=" container px-24 mt-4">
    <div className="flex justify-between items-between">
     <div className="text-xl font-bold">All Reviews</div>
     <div className="py-3 px-6 cursor-pointer hover:ring-2 border-2 hover:bg-balck hover:bg-gray-900   bg-slate-800 rounded-full text-white">
      Write a feedback
     </div>
    </div>
    <div className="bg-white min-h-[100px] rounded-lg shadow-md p-4 mt-4 mb-8">
     <div>
      {feedback.length == 0 ? (
       <div>123</div>
      ) : (
       <div className="text-lg">No feedback</div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default ProductReview;
