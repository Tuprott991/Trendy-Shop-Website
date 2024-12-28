import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductCard from "../../components/customer/ProductCard";

const CustomerSearch = () => {
 const params = useParams();
 const [products, setProducts] = useState([]);
 useEffect(() => {
  const fecthProducts = async () => {
   const response = params.category
    ? await productService.getProductListCategory(params.category)
    : await productService.getProductList(params.keyword);
   const data = response.data.productInfo
    ? response.data.productInfo
    : response.data.products;
   setProducts(data);
  };
  fecthProducts();
 }, [params.keyword, params.catewgory]);
 console.log(products);
 return (
  <div className="flex flex-col px-40 bg-slate-100 h-screen">
   <div className="justify-end items-left text-right text-xl mt-8 ">
    <span className="bg-slate-100 font-semibold">Sort by </span>
    <select className="bg-white " name="" id="">
     <option value="highestPrice">Highest price</option>
     <option value="lowestPrice">Lowest price</option>
     <option value="mostPoplular">Most popular</option>
     <option value="leastPopular">Least popular</option>
    </select>
   </div>
   <div className="flex justify-center items-center ">
    <div className="grid grid-cols-4 gap-4 justify-center mt-8 ">
     {products.map((product) => (
      <ProductCard product={product} key={product._id}></ProductCard>
     ))}
    </div>
   </div>
  </div>
 );
};

export default CustomerSearch;
