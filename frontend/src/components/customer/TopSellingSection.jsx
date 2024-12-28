import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const TopSellingSection = () => {
 const [topSelling, setTopSelling] = useState([]);
 const navigate = useNavigate();
 useEffect(() => {
  const fetchTopSelling = async () => {
   const response = await productService.getProductList("t-shirt");
   setTopSelling(response.data.productInfo);
  };
  fetchTopSelling();
 }, []);
 const handleViewAll = () => {
  navigate("/customer/search");
 };
 console.log(topSelling);
 return (
  <div>
   <h1 className="text-center text-[36px] mt-12 font-bold">TOP SELLING</h1>
   <div className="flex justify-center items-center px-40 flex-col">
    <div className="grid grid-cols-4 gap-4 justify-center mt-8 ">
     {topSelling.slice(0, 4).map((product) => (
      <ProductCard product={product} key={product._id}></ProductCard>
     ))}
    </div>
    <div
     className="mt-12 mb-8 border border-gray-400 rounded-3xl font-semibold text-gray-800 px-16 py-2 text-lg cursor-pointer hover:text-white ring ring-green-50 hover:bg-green-500 transition-colors"
     onClick={handleViewAll}
    >
     View all
    </div>
   </div>
  </div>
 );
};

export default TopSellingSection;
