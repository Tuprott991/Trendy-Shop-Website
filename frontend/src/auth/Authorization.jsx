import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Authorization = ({ allowedRoles }) => {
 const { isAuthenticated } = useContext(AuthContext);
 const params = useParams();
 if (!isAuthenticated) {
  console.log(isAuthenticated);
  return <Navigate to="/login" />;
 }

 const role = localStorage.getItem("role");
 if (!allowedRoles.includes(role)) {
  return <Navigate to="/login" />;
 }

 return <Outlet />;
};

export default Authorization;
