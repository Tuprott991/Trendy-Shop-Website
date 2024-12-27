import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/retailer/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/retailer/DashboardView/SummaryStatistics";
import ManageProducts from "../../components/retailer/DashboardView/ManageProducts";
import { retailerService } from "../../services/retailerService";

const RetailerDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalDelivered: 0,
        totalRevenue: 0,
        totalProducts: 0, // Thêm số lượng sản phẩm vào thống kê
    });
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
                        totalProducts: data.data.productList.length, // Cập nhật số lượng sản phẩm
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

    const handleProductsChange = (updatedProducts) => {
        // Cập nhật lại sản phẩm và số lượng sản phẩm
        setProducts(updatedProducts);
        setStats((prevStats) => ({
            ...prevStats,
            totalProducts: updatedProducts.length, // Cập nhật lại số lượng sản phẩm
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <DashboardHeader />
            <SummaryStatistics stats={stats} products={products}/>
            <ManageProducts 
                products={products} 
                onProductsChange={handleProductsChange} // Truyền callback để cập nhật sản phẩm
            />
        </div>
    );
};

export default RetailerDashboard;
