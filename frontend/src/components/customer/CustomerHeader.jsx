import { useContext, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import { CgShoppingCart } from "react-icons/cg";
import { CgBox } from "react-icons/cg";
import { CgUserList } from "react-icons/cg";
import { DropdownContext } from "../../context/DropDownContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomerHeader = () => {
 const { isOpen, setIsOpen } = useContext(DropdownContext);
 const { isLoginSuccess, logout, setIsLoginSuccess } = useContext(AuthContext);
 const divRef = useRef(null);
 const logoutRef = useRef(null);
 const navigate = useNavigate();
 useEffect(() => {
  if (isLoginSuccess) {
   const timer = setTimeout(() => setIsLoginSuccess(false), 3500);
   return () => clearTimeout(timer);
  }
 }, [isLoginSuccess, setIsLoginSuccess]);

 useEffect(() => {
  const handleClickOutside = (event) => {
   if (divRef.current && !divRef.current.contains(event.target)) {
    setIsOpen(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [isOpen, setIsOpen]);

 const handleLogout = () => {
  console.log("Logging out...");
  logout();
  navigate("/login");
 };
 const handleNavigateHome = () => {
  navigate("/customer");
 };

 return (
  <>
   {isLoginSuccess && (
    <div
     className="absolute z-50 right-6 top-16 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
     role="alert"
    >
     <svg
      className="flex-shrink-0 inline w-4 h-4 me-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
     >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <div>
      <span className="font-medium">Successfully login!</span>
     </div>
    </div>
   )}

   {/* Overlay for dropdown */}
   {isOpen && (
    <div
     className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"
     onClick={() => setIsOpen((prev) => !prev)}
    ></div>
   )}

   {/* Header */}
   <div className="px-[48px] py-[16px] flex justify-between items-center">
    <h1
     className="cursor-pointer hover:text-green-600 text-[32px] font-bold text-green-500 opacity-95"
     onClick={handleNavigateHome}
    >
     SoftWear
    </h1>
    <SearchBar />
    <div className="flex gap-8 items-center">
     <div>
      <CgShoppingCart
       className="cursor-pointer hover:text-green-500"
       size={22}
      />
     </div>
     <div>
      <CgBox className="cursor-pointer hover:text-green-500" size={22} />
     </div>
     <div className="relative " onClick={() => setIsOpen(true)} ref={divRef}>
      <CgUserList
       className={`cursor-pointer hover:text-green-500 ${
        isOpen ? "text-green-500" : ""
       }`}
       size={23}
      />
      {isOpen && (
       <div className="shadow-lg ring-1 ring-black/5 rounded-lg absolute z-[100] mt-1 right-0 border pr-8 pl-4 py-2 space-y-2 bg-white text-left font-medium text-sm">
        <div className="text-gray-800 hover:text-green-500 pr-4 py-1 cursor-pointer">
         Account
        </div>
        <div className="border w-[125%]"></div>
        <div
         ref={logoutRef}
         onClick={handleLogout}
         className="text-gray-800 hover:text-green-500 pr-4 py-1 cursor-pointer"
        >
         Logout
        </div>
       </div>
      )}
     </div>
    </div>
   </div>
  </>
 );
};

export default CustomerHeader;
