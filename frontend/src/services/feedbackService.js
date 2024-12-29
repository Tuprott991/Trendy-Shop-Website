import axios from "axios";

const createFeedback = async (
 customer_id,
 product_id,
 name,
 contact,
 email,
 rating,
 comment
) => {
 try {
  const response = await axios.post(
   "http://localhost:8080/api/customer/product/review",
   { customer_id, product_id, name, contact, email, rating, comment }
  );
  return response;
 } catch (e) {
  return e.response;
 }
};

export const feedbackService = {
 createFeedback,
};
