import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/retailer/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/retailer/DashboardView/SummaryStatistics";
import ManageProducts from "../../components/retailer/DashboardView/ManageProducts";
import { retailerService } from "../../services/retailerService";

const RetailerDashboard = () => {
    const [stats, setStats] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await retailerService.getDashboard(token);
                if (data?.data) {
                    setStats({
                        totalOrders: data.data.totalOrders,
                        totalDelivered: data.data.totalDelivered,
                        totalRevenue: data.data.totalRevenue,
                    });
                    setProducts(data.data.productList || []);
                } else {
                    setError("Invalid data format.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <DashboardHeader />
            <SummaryStatistics stats={stats} products={products}/>
            <ManageProducts products={products} onProductsChange={setProducts} />
        </div>
    );
};

export default RetailerDashboard;
