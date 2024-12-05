import { useContext } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import Login from "../pages/authentication/Login";
import { AuthContext } from "../context/AuthContext";

const Authorization = ({ allowedRoles }) => {
 const { isAuthenticated } = useContext(AuthContext);
 const params = useParams(); // Get route parameters
 const location = useLocation(); // Get the current URL

 console.log("Route Parameters:", params);
 console.log("Current URL:", location.pathname); // Full URL path
 console.log("Query String:", location.search); // Query string if any
 if (!isAuthenticated) {
  return <Navigate to="login" />;
 }
 const role = localStorage.getItem("role");
 if (role == allowedRoles[0]) {
  console.log(2);
  return <Outlet />;
 }
 return <Navigate to="login" />;
};

export default Authorization;
