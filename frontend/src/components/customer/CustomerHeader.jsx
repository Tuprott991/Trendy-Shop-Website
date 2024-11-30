import SearchBar from "./SearchBar";
import { CgShoppingCart } from "react-icons/cg";
import { CgBox } from "react-icons/cg";
import { CgUserList } from "react-icons/cg";
const CustomerHeader = () => {
 return (
  <div className="px-[48px] py-[16px] flex justify-between items-center">
   <h1 className="cursor-pointer hover:text-green-600 text-[32px] font-bold text-green-500 opacity-95">
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
    <div>
     <CgUserList className="cursor-pointer hover:text-green-500" size={23} />
    </div>
   </div>
  </div>
 );
};

export default CustomerHeader;
