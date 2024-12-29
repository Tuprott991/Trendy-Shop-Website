import axios from "axios";

const getVoucherList = async (retailerIDs) => {
 try {
  const response = await axios.post(
   "http://localhost:8080/api/customer/order/getvoucher",
   { retailerIDs }
  );
  return response;
 } catch (e) {
  return e.response;
 }
};

const getVoucherDiscount = async (products, voucherCode) => {
 try {
  const response = await axios.post(
   "http://localhost:8080/api/customer/order/discount",
   { products, voucherCode }
  );
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

export const voucherService = {
 getVoucherList,
 getVoucherDiscount,
};
