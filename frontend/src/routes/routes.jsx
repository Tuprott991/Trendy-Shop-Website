import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/authentication/Login.jsx";
import Signup from "../pages/authentication/Signup.jsx";
import CustomerLayout from "../pages/customer/CustomerLayout.jsx";
import CustomerHome from "../pages/customer/CustomerHome.jsx";
import CustomerProductDetail from "../pages/customer/CustomerProductDetail.jsx";
import RetailerLayout from "../pages/retailer/RetailerLayout.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import Authorization from "../auth/Authorization.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const AppRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const role = localStorage.getItem("role");

    const routes = useRoutes([
        {
            path: "login",
            element: isAuthenticated ? <Navigate to={`/${role}`} replace /> : <Login />,
        },
        {
            path: "signup",
            element: isAuthenticated ? <Navigate to={`/${role}`} replace /> : <Signup />,
        },

        {
            element: <Authorization allowedRoles={["customer"]} />,
            children: [
                {
                    path: "customer",
                    element: <CustomerLayout />,
                    children: [
                        {
                            index: true, // Default route for `/customer`
                            element: <CustomerHome />,
                        },
                        {
                            path: "product/:id", // Route for `/customer/product/:id`
                            element: <CustomerProductDetail />,
                        },
                    ],
                },
            ],
        },

        // Retailer Routes
        {
            element: <Authorization allowedRoles={["retailer"]} />,
            children: [
                {
                    path: "retailer",
                    index: true,
                    element: <RetailerLayout />,
                },
            ],
        },

        // Admin Routes
        {
            element: <Authorization allowedRoles={["admin"]} />,
            children: [
                {
                    path: "admin",
                    element: <AdminLayout />,
                    index: true,
                },
            ],
        },
    ]);

    return routes;
};

export default AppRoutes;
