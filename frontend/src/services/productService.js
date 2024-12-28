import axios from "axios";

const getProductList = async (keyword) => {
 try {
  const url = keyword
   ? `http://localhost:8080/api/customer/search/${keyword}`
   : "http://localhost:8080/api/customer/search/";

  const response = await axios.get(url);
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

const getProductListCategory = async (category) => {
 try {
  const response = await axios.get(
   `http://localhost:8080/api/customer/search/category/${category}`
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};
const getProductDetail = async (id) => {
 try {
  const response = await axios.get(
   `http://localhost:8080/api/customer/product/detail/${id}`
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

const getProductFeedback = async (id) => {
 try {
  const response = await axios.get(
   `http://localhost:8080/api/customer/product/review/${id}`
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

export const productService = {
 getProductList,
 getProductListCategory,
 getProductDetail,
 getProductFeedback,
};
