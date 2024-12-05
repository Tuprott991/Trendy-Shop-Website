import { Navigate, useRoutes } from "react-router-dom";

import Login from "../pages/authentication/Login.jsx";
import Signup from "../pages/authentication/Signup.jsx";

import CustomerLayout from "../pages/customer/CustomerLayout.jsx";
import CustomerHome from "../pages/customer/CustomerHome.jsx";
import CustomerProductDetail from "../pages/customer/CustomerProductDetail.jsx";
import RetailerLayout from "../pages/retailer/RetailerLayout.jsx";

import AdminLayout from "../pages/admin/AdminLayout.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminManage from "../pages/admin/AdminManage.jsx";
import AdminProfile from "../pages/admin/AdminProfile.jsx";

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
                    children: [
                        {
                            index: true,
                            element: <AdminDashboard />,
                        },
                        {
                            path: "manage",
                            element: <AdminManage />,
                        },
                        {
                            path: "profile",
                            element: <AdminProfile />,
                        },
                    ],
                },
            ],
        },
    ]);

    return routes;
};

export default AppRoutes;
