import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductInfo from "../../components/customer/ProductInfo";

const CustomerProductDetail = () => {
 const [product, setProduct] = useState();
 const { id } = useParams();
 useEffect(() => {
  const fetchProduct = async () => {
   const response = await productService.getProductDetail(id);
   console.log(response);
   setProduct(response.data.productInfo);
  };
  fetchProduct();
 }, [id]);
 console.log(product);
 if (!product) {
  return null;
 }
 return (
  <div className="bg-gray-100">
   <div className="pt-12 ">
    <ProductInfo product={product}></ProductInfo>
   </div>
  </div>
 );
};

export default CustomerProductDetail;
