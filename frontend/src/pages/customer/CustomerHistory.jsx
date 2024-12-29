import { useEffect, useState } from "react";
import { userService } from "../../services/userService";

const CustomerHistory = () => {
 const [customerHistory, setCustomerHistory] = useState([]);
 useEffect(() => {
  const fetchProfile = async () => {
   const response = await userService.getUserProfile(
    localStorage.getItem("token")
   );
   console.log(response);
   setCustomerHistory(response.order_list);
  };
  fetchProfile();
 }, []);
 console.log(customerHistory);
 return <div>CustomerHistory</div>;
};

export default CustomerHistory;
