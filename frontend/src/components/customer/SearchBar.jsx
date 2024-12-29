import { AiOutlineSearch } from "react-icons/ai";
import { categoryService } from "../../services/categoryService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
 const [categories, setCategories] = useState([]);
 const navigate = useNavigate();
 const handleSubmit = (e) => {
  e.preventDefault();
  const searchValue = e.target.search.value;
  console.log("Search for:", searchValue);
  navigate(`/customer/search/keyword/${searchValue}`);
 };
 useEffect(() => {
  const fetchAndProcessCategories = async () => {
   try {
    const response = await categoryService.getAll();
    const groupedCategories = response.data.reduce(
     (acc, { id, category, target }) => {
      if (!acc[target]) {
       acc[target] = [];
      }
      acc[target].push({ id, category });
      return acc;
     },
     {}
    );
    setCategories(groupedCategories);
   } catch (error) {
    console.error("Error fetching categories:", error);
   }
  };

  fetchAndProcessCategories();
 }, []);
 const handleCategoryClick = (id) => {
  console.log("Category ID:", id);
  navigate(`/customer/search/category/${id}`);
 };

 return (
  <>
   <div className="flex gap-8 font-bold text-sm text-gray-900">
    <div className="group relative h-full">
     <div className="text-lg ml-8 cursor-pointer  flex items-center  group-hover:text-green-600 duration-100 ">
      Category
      <svg
       className="-mr-1 size-5 text-gray-900 group-hover:text-green-600 duration-100"
       viewBox="0 0 20 20"
       fill="currentColor"
       aria-hidden="true"
       data-slot="icon"
      >
       <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
       />
      </svg>
     </div>

     <div
      className="hidden group-hover:block absolute right-0 z-10 w-56 rounded-lg "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
     >
      <div
       className="py-1 w-fit h-[105%] mt-3 bg-white shadow-lg ring-1 ring-black/5 rounded-lg flex"
       role="none"
      >
       {Object.keys(categories).map((category, index) => (
        <div
         key={category}
         className={`space-y-2 px-6 py-4 ${
          index !== Object.keys(categories).length - 1
           ? "border-r border-green-100 pr-8"
           : ""
         }`}
        >
         <h2 className="font-semibold text-gray-900">{category}</h2>
         <ul className="pt-2 space-y-1 flex flex-col gap-2">
          {categories[category].map((item) => (
           <li
            key={item.id}
            className="text-sm text-gray-800 font-medium hover:bg-gray-100 hover:text-green-500 px-3 py-2 rounded-md cursor-pointer"
            onClick={() => handleCategoryClick(item.id)} // Pass `item.id` directly
           >
            {item.category}
           </li>
          ))}
         </ul>
        </div>
       ))}
      </div>
     </div>
    </div>

    {/* <div className="cursor-pointer hover:text-green-500 transition-all duration-75">
     On sale
    </div>
    <div className="cursor-pointer hover:text-green-500 transition-all duration-75">
     Retailer
    </div> */}
   </div>
   <form onSubmit={handleSubmit} className="ml-8 flex items-center w-[45%]">
    <div className="absolute ml-4">
     <AiOutlineSearch size={20} />
    </div>
    <input
     type="text"
     name="search"
     id="search"
     placeholder="Search for products..."
     className="pl-10 block w-full rounded-[2rem] bg-gray-100 px-3 py-[10px] text-base text-gray-900 placeholder:text-gray-600 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
    />
   </form>
   <br />
  </>
 );
};

export default SearchBar;
