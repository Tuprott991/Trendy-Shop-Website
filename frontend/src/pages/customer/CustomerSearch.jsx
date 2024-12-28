import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductCard from "../../components/customer/ProductCard";

const CustomerSearch = () => {
 const params = useParams();
 const [products, setProducts] = useState([]);
 console.log(params);
 const [sortby, setSortby] = useState("");
 const handleSortChange = (e) => {
  setSortby(e.target.value);
  console.log("Selected Sort Option:", e.target.value);
  if (e.target.value === "lowestPrice") {
   setProducts((prev) => prev.sort((a, b) => a.price - b.price));
  } else if (e.target.value === "highestPrice") {
   setProducts((prev) => prev.sort((a, b) => b.price - a.price));
  } else if (e.target.value === "leastPopular") {
   setProducts((prev) => prev.sort((a, b) => a.rating - b.rating));
  } else if (e.target.value === "mostPopular") {
   setProducts((prev) => prev.sort((a, b) => b.rating - a.rating));
  }
 };
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
 }, [params]);
 console.log(products);
 return (
  <div className="flex flex-col px-40 bg-slate-100 pb-8">
   <div className="justify-end items-left text-right text-xl mt-8 ">
    <span className="bg-slate-100 font-semibold">Sort by </span>
    <select
     className="bg-white"
     name="sortby"
     id="sortby"
     value={sortby} // Bind the state to the select value
     onChange={handleSortChange} // Handle changes to update the state
    >
     <option value="" disabled>
      Select an option
     </option>
     <option value="lowestPrice">Lowest price</option>
     <option value="highestPrice">Highest price</option>
     <option value="leastPopular">Least popular</option>
     <option value="mostPopular">Most popular</option>
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
