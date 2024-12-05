import axios from "axios";

const getAll = async () => {
 try {
  const response = await axios.get(
   "http://localhost:8080/api/customer/category/all"
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

export const categoryService = {
 getAll,
};
