import SearchBar from "./SearchBar";
import { CgShoppingCart } from "react-icons/cg";
import { CgBox } from "react-icons/cg";
import { CgUserList } from "react-icons/cg";
const CustomerHeader = () => {
 return (
  <div className="px-[48px] py-[16px] flex justify-between items-center">
   <h1 className="text-[32px] font-bold text-green-700 opacity-95">SoftWear</h1>
   <SearchBar />
   <div className="flex gap-8">
    <div>
     <CgShoppingCart size={20} />
    </div>
    <div>
     <CgBox size={20} />
    </div>
    <div>
     <CgUserList size={20} />
    </div>
   </div>
  </div>
 );
};

export default CustomerHeader;
