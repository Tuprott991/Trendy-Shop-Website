import { Outlet } from "react-router-dom";
import CustomerHeader from "../../components/customer/CustomerHeader";

const CustomerLayout = () => {
 return (
  <>
   <CustomerHeader>Header</CustomerHeader>
   <Outlet />
   <footer>Footer</footer>
  </>
 );
};

export default CustomerLayout;
