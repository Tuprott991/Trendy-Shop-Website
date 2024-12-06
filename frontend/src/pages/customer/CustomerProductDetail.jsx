import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductInfo from "../../components/customer/ProductInfo";
import ProductReview from "../../components/customer/ProductReview";
import ProductCard from "../../components/customer/ProductCard";

const CustomerProductDetail = () => {
 const [product, setProduct] = useState();

 const { id } = useParams();
 const [relatedProducts, setRelatedProducts] = useState([]);
 useEffect(() => {
  const fetchProduct = async () => {
   const response = await productService.getProductDetail(id);
   setProduct(response.data.productInfo);
  };
  fetchProduct();
 }, [id]);
 useEffect(() => {
  const fetchRelatedProducts = async () => {
   const response = await productService.getProductList("nike");
   setRelatedProducts(response.data.productInfo);
  };
  fetchRelatedProducts();
 }, []);
 if (!product) {
  return null;
 }

 return (
  <div className="bg-gray-100">
   <div className="pt-12 ">
    <ProductInfo product={product}></ProductInfo>
    <ProductReview product={product}></ProductReview>
    <div className="flex flex-wrap justify-center">
     <h1 className="text-center text-3xl font-semibold text-gray-800 mb-12">
      You might also like
     </h1>
     <div className="grid grid-cols-4 gap-4 px-28">
      {relatedProducts &&
       relatedProducts
        .slice(0, 4)
        .map((related) => <ProductCard key={related._id} product={related} />)}
     </div>
    </div>
   </div>
  </div>
 );
};

export default CustomerProductDetail;
