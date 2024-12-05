import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Authorization = ({ allowedRoles }) => {
 const { isAuthenticated } = useContext(AuthContext);
 const location = useLocation();
 console.log(1);
 if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
 }

 const role = localStorage.getItem("role");
 if (!allowedRoles.includes(role)) {
  print(location);
  return <Navigate to="/login" state={{ from: location }} repl ace />;
 }

 return <Outlet />;
};

export default Authorization;
