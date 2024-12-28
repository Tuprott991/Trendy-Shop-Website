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

export const orderService = {
 createOrder,
};
