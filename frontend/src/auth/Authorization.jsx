import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Authorization = ({ allowedRoles }) => {
 const { isAuthenticated } = useContext(AuthContext);
 const params = useParams();
 console.log(params);
 if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
 }

 const role = localStorage.getItem("role");
 if (!allowedRoles.includes(role)) {
  return <Navigate to="/login" state={{ from: location }} repl ace />;
 }

 return <Outlet />;
};

export default Authorization;
