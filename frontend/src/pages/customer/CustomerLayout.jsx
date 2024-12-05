import { Outlet } from "react-router-dom";
import CustomerHeader from "../../components/customer/CustomerHeader";
import { useEffect } from "react";

const CustomerLayout = () => {
 return (
  <>
   <CustomerHeader>Header</CustomerHeader>
   <main>
    <Outlet />
   </main>
   <footer>Footer</footer>
  </>
 );
};

export default CustomerLayout;
