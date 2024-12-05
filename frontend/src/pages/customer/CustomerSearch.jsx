import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductCard from "../../components/customer/ProductCard";

const CustomerSearch = () => {
 const params = useParams();
 const [products, setProducts] = useState([]);
 useEffect(() => {
  const fecthProducts = async () => {
   const response = await productService.getProductList(params.keyword);
   setProducts(response.data.productInfo);
  };
  fecthProducts();
 }, [params.keyword]);
 console.log(products);
 return (
  <div className="flex justify-center items-center px-40 bg-slate-100">
   <div className="grid grid-cols-4 gap-4 justify-center mt-20 ">
    {products.map((product) => (
     <ProductCard product={product} key={product._id}></ProductCard>
    ))}
   </div>
  </div>
 );
};

export default CustomerSearch;
