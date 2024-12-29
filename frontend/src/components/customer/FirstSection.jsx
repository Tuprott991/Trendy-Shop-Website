import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstSection = () => {
 const [username, setUsername] = useState();
 useEffect(() => {
  setUsername(localStorage.getItem("name"));
 }, []);
 const navigate = useNavigate();
 const handleClick = async () => {
  navigate("/customer/search/keyword/");
 };
 return (
  <div className="relative ">
   <img src="./Banner.png" alt="" />
   <button
    onClick={handleClick}
    className="absolute left-[100px] top-[360px] py-[16px] px-[60px] rounded-[2rem] text-sm font-bold outline-none bg-green-500 text-white  hover:ring ring-green-300 hover:bg-green-600 transition-colors"
   >
    Shop now
   </button>
   {/* <div className="absolute left-[100px] top-[35px]    outline-none   text-white bg-gray-400 px-4 py-1 rounded-3xl hover:text-white hover:bg-green-500 transition-colors">
    {`Welcome ${username}`}
   </div> */}
  </div>
 );
};

export default FirstSection;
