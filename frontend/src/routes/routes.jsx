import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/authentication/Login.jsx";
import CustomerLayout from "../pages/customer/CustomerLayout.jsx";
import Signup from "../pages/authentication/Signup.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import RetailerLayout from "../pages/retailer/RetailerLayout.jsx";
import Authorization from "../auth/Authorization.jsx";
import CustomerHome from "../pages/customer/CustomerHome.jsx";
import CustomerProductDetail from "../pages/customer/CustomerProductDetail.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const AppRoutes = () => {
 const { isAuthenticated } = useContext(AuthContext);
 const role = localStorage.getItem("role");
 const routes = useRoutes([
  {
   path: "/",
   children: [
    {
     path: "login",
     element: isAuthenticated ? (
      <Navigate to={`/${role}`} replace />
     ) : (
      <Login />
     ),
    },
    {
     path: "signup",
     element: isAuthenticated ? (
      <Navigate to={`/${role}`} replace />
     ) : (
      <Signup />
     ),
    },

    {
     element: <Authorization allowedRoles={["customer"]} />,
     children: [
      {
       path: "customer",
       element: <CustomerLayout />,
       children: [
        {
         index: true,
         element: <CustomerHome />,
        },
        {
         path: "product/:id",
         element: <CustomerProductDetail />,
        },
       ],
      },
     ],
    },
    {
     element: <Authorization allowedRoles={["retailer"]} />,
     children: [
      {
       path: "retailer",
       element: <RetailerLayout />,
      },
     ],
    },
    {
     element: <Authorization allowedRoles={["admin"]} />,
     children: [
      {
       path: "admin",
       element: <AdminLayout />,
      },
     ],
    },
   ],
  },
 ]);
 return routes;
};

export default AppRoutes;
