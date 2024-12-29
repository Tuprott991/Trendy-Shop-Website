import axios from "axios";

const createOrder = async (
 customer_id,
 product_list,
 voucher,
 name,
 address,
 city,
 phone,
 email,
 payment_method
) => {
 try {
  const response = await axios.post(
   "http://localhost:8080/api/customer/createorders",
   {
    customer_id,
    product_list,
    voucher,
    name,
    address,
    city,
    phone,
    email,
    payment_method,
   }
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

const getOrderHistory = async (customer_id) => {
 try {
  const response = await axios.get(
   `http://localhost:8080/api/customer/customerorders/${customer_id}`
  );
  return response;
 } catch (e) {
  // Check if e.response exists before logging it
  if (e.response) {
   console.log(e.response);
   return e.response;
  } else {
   // Log error if no response object exists
   console.log("Error: ", e.message);
   return { error: e.message };
  }
 }
};

export const orderService = {
 createOrder,
 getOrderHistory,
};
