import { Navigate } from "react-router-dom";

const Authorization = () => {
 const role = localStorage.getItem("role");
 console.log("User role:", role);
 switch (role) {
  case "customer":
   return <Navigate to="/customer" />;
  case "retailer":
   return <Navigate to="/retailer" />;
  case "admin":
   return <Navigate to="/admin" />;
  default:
   return <Navigate to="/login" />;
 }
};

export default Authorization;
