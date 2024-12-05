import axios from "axios";

const getProductList = async (keyword) => {
 try {
  const response = await axios.get(
   `http://localhost:8080/api/customer/search/${keyword}`
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

export const productService = {
 getProductList,
};
