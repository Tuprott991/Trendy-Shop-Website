import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductCard from "../../components/customer/ProductCard";

const CustomerSearch = () => {
 const params = useParams();
 const [isLoading, setIsLoading] = useState(false);
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
   setProducts([]);
   setIsLoading(true);
   await new Promise((resolve) => {
    setTimeout(resolve, 1500);
   });
   const response = params.category
    ? await productService.getProductListCategory(params.category)
    : await productService.getProductList(params.keyword);
   const data = response.data.productInfo
    ? response.data.productInfo
    : response.data.products;
   if (data.length === 0) {
    setProducts(null);
   } else setProducts(data);

   setIsLoading(false);
  };
  fecthProducts();
 }, [params]);
 if (!products) {
  return (
   <div className="bg-slate-100 min-h-screen">
    <h1 className="pl-12 text-xl font-semibold pt-12 ">No products found</h1>
   </div>
  );
 }
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
   <div className="flex justify-center items-center min-h-screen">
    {isLoading && (
     <div role="status">
      <svg
       aria-hidden="true"
       className="mb-40 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
       viewBox="0 0 100 101"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
       />
       <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
       />
      </svg>
     </div>
    )}
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
