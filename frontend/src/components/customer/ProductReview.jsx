import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";

const ProductReview = () => {
 const params = useParams();

 const [feedbackList, setFeedbackList] = useState("");
 const [feedbackOpen, setFeedbackOpen] = useState(false);
 const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  rating: "",
  description: "",
 });
 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "rating") {
   const parsedValue = parseFloat(value); // Chuyển giá trị thành số thập phân

   if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 5) {
    // Chỉ cập nhật nếu giá trị nằm trong khoảng từ 0 đến 5
    setFormData({ ...formData, [name]: value });
   } else if (value === "") {
    // Cho phép người dùng xoá input
    setFormData({ ...formData, [name]: "" });
   }
  } else {
   setFormData({ ...formData, [name]: value });
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Feedback submitted:", formData);
  setFeedbackOpen(false);
  // Add your submission logic here (e.g., API call)
 };
 const divRef = useRef(null);
 useEffect(() => {
  const fetchFeedback = async () => {
   const response = await productService.getProductFeedback(params.id);
   setFeedbackList(response.data);
  };
  fetchFeedback();
 }, [params.id]);
 useEffect(() => {
  const handleClickOutside = (event) => {
   if (divRef.current && !divRef.current.contains(event.target)) {
    setFeedbackOpen(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [feedbackOpen, setFeedbackOpen]);
 const handleToogleFeedback = () => {
  setFeedbackOpen(true);
 };
 console.log(feedbackOpen);
 return (
  <>
   {feedbackOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"></div>
   )}
   <div className="flex flex-col items-center justify-center mt-12">
    {feedbackOpen && (
     <div
      ref={divRef}
      className="shadow-lg  ring-1 ring-black/5 rounded-lg fixed z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-[50%] border pr-8 pl-4 py-2 space-y-2 bg-white text-left font-medium text-sm"
     >
      <div className="text-left pr-16 pt-3 pb-2 font-bold px-4">Feedback</div>
      <div className="border border-gray-200 w-[100%] px-4"></div>
      <div className="pt-3 pb-2 ">
       <form onSubmit={handleSubmit} className="px-4">
        <div className="flex justify-between gap-4 mb-4">
         <div className="w-2/3">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
           type="text"
           name="name"
           value={formData.name}
           onChange={handleChange}
           className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
           placeholder="Your name"
           required
          />
         </div>

         <div className="w-1/3">
          <label className="block text-gray-700 font-medium">
           Phone Number
          </label>
          <input
           type="tel"
           name="phone"
           value={formData.phone}
           onChange={handleChange}
           className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
           placeholder="Your phone number"
           required
          />
         </div>
        </div>

        <div className="flex justify-between gap-4 mb-4">
         <div className="w-2/3">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
           placeholder="Your email"
           required
          />
         </div>

         {/* Rating Field */}
         <div className="w-1/3">
          <label className="block text-gray-700 font-medium">
           Rating (0-5)
          </label>
          <input
           value={formData.rating}
           type="number"
           name="rating"
           onChange={handleChange}
           min="0"
           step="0.1"
           max="5"
           className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
           required
          />
         </div>
        </div>

        {/* Description Field */}
        <div>
         <label className="block text-gray-700 font-medium">Description</label>
         <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Describe your feedback"
          rows={4}
          required
         ></textarea>
        </div>
        <div className="flex gap-4 items-center justify-end mt-4">
         <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setFeedbackOpen(false)}
         >
          Cancle
         </button>
         <button
          type="submit"
          className="text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700"
         >
          Submit
         </button>
        </div>
       </form>
      </div>
     </div>
    )}
    <div className="text-xl font-bold text-gray-800 mb-2">Rating & Reviews</div>
    <div
     className="border border-gray-200 w-[80%] "
     style={{
      borderImage:
       "linear-gradient(to right, transparent, gray, transparent) 1",
     }}
    ></div>
    <div className=" container px-24 mt-4">
     <div className="flex justify-between items-between">
      <div className="text-xl font-bold">All Reviews</div>
      <div
       className="py-3 px-6 cursor-pointer hover:ring-2 border-2 hover:bg-balck hover:bg-gray-900   bg-slate-800 rounded-full text-white"
       onClick={handleToogleFeedback}
      >
       Write a feedback
      </div>
     </div>
     <div className="bg-white min-h-[100px] rounded-lg shadow-md p-4 mt-4 mb-8">
      <div>
       {feedbackList.length == 0 ? (
        <div>123</div>
       ) : (
        <div className="text-lg">No feedback</div>
       )}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default ProductReview;
