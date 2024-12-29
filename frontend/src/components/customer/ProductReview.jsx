import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import { feedbackService } from "../../services/feedbackService";

const ProductReview = () => {
 const params = useParams();

 const [feedbackList, setFeedbackList] = useState([]);
 const [feedbackOpen, setFeedbackOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [feedbackMessage, setFeedbackMessage] = useState(null);

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
 const fetchFeedback = async () => {
  const response = await productService.getProductFeedback(params.id);
  setFeedbackList(response.data.feedbacks);
 };
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const repsonse = await feedbackService.createFeedback(
   localStorage.getItem("_id"),
   params.id,
   formData.name,
   formData.phone,
   formData.email,
   formData.rating,
   formData.description
  );
  await new Promise((resolve) => {
   setTimeout(resolve, 1500);
  });
  console.log("CREATE FEEDBACK", repsonse);
  setIsLoading(false);
  setFeedbackMessage("Your feedback has been submitted successfully!");
  setFeedbackOpen(false);
  fetchFeedback();
  setFormData({ name: "", phone: "", email: "", rating: "", description: "" });
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
 const divRef = useRef(null);
 useEffect(() => {
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
 const notiRef = useRef(null);
 console.log(feedbackList);
 return (
  <>
   {(feedbackOpen || feedbackMessage) && (
    <div className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"></div>
   )}
   {feedbackMessage && (
    <div
     ref={divRef}
     className=" shadow-lg ring-1 ring-black/5 rounded-lg fixed z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-fit border  py-4 space-y-2 bg-white font-medium text-sm"
    >
     <div className="text-center pt-3 pb-2 flex flex-col justify-center items-center px-8 text-lg">
      <img src="/navigation.png" className="w-52 h-52" alt="123" />
      <p>Your feedback has been placed successfully!</p>
      <p>The retailer is now reviewing it.</p>
     </div>

     <div className="flex justify-center items-center pb-2 text-lg">
      <div
       ref={notiRef}
       className="text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700 "
       onClick={() => setFeedbackMessage(null)}
      >
       Ok
      </div>
     </div>
    </div>
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
          className="flex items-center text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700"
         >
          Submit
          {isLoading && (
           <div role="status">
            <svg
             aria-hidden="true"
             className="ml-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
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
    <div className=" container px-24 mt-4 ">
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
       {feedbackList.length === 0 ? (
        <div className="text-lg">No feedback</div>
       ) : (
        <div className="grid grid-cols-2 gap-4 justify-between px-4">
         {feedbackList &&
          feedbackList.map((feedback) => {
           return (
            <div
             className="px-4 border-2 rounded-2xl flex flex-col gap-2 mt-2"
             key={feedback._id}
            >
             <div className="mt-2">{renderStars(feedback.rating)}</div>
             <div className="font-bold">{feedback.name}</div>
             <div className="text-gray-700">{feedback.comment}</div>
             <div className="text-gray-500 mb-4">
              {new Date(feedback.createdAt).toLocaleDateString("en-US", {
               month: "long",
               day: "numeric",
               year: "numeric",
              })}
             </div>
            </div>
           );
          })}
        </div>
       )}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default ProductReview;
