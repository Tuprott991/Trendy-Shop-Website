import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/authentication/Login.jsx";
import Signup from "../pages/authentication/Signup.jsx";
import CustomerLayout from "../pages/customer/CustomerLayout.jsx";
import CustomerHome from "../pages/customer/CustomerHome.jsx";
import CustomerProductDetail from "../pages/customer/CustomerProductDetail.jsx";
import Authorization from "../auth/Authorization.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import CustomerSearch from "../pages/customer/CustomerSearch.jsx";

const AppRoutes = () => {
 const { isAuthenticated } = useContext(AuthContext);
 const role = localStorage.getItem("role");

 const routes = useRoutes([
  {
   path: "/",
   element: <Navigate to="/login" replace />,
  },
  {
   path: "/login",
   element: isAuthenticated ? <Navigate to={`/${role}`} replace /> : <Login />,
  },
  {
   path: "/signup",
   element: isAuthenticated ? <Navigate to={`/${role}`} replace /> : <Signup />,
  },
  {
   element: <Authorization allowedRoles={["customer"]} />,
   children: [
    {
     path: "customer",
     element: <CustomerLayout />,
     children: [
      { index: true, element: <CustomerHome /> },
      { path: "product/:id", element: <CustomerProductDetail /> },
      { path: "search/:keyword", element: <CustomerSearch /> },
     ],
    },
   ],
  },
  {
   element: <Authorization allowedRoles={["retailer"]} />,
   children: [
    {
     path: "retailer",
     element: <div>Coming Soon</div>, // Placeholder
    },
   ],
  },
  {
   element: <Authorization allowedRoles={["admin"]} />,
   children: [
    {
     path: "admin",
     element: <div>Coming Soon</div>, // Placeholder
    },
   ],
  },
  {
   path: "*",
   element: <div>404 - Page Not Found</div>,
  },
 ]);

 return routes;
};

export default AppRoutes;
