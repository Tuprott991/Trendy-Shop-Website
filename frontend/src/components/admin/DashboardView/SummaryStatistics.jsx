import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { BsPersonCheck } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePriceChange, MdReceiptLong } from "react-icons/md";
import { adminService } from "../../../services/adminService";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adminService.getAdminDashboard();
                if (data?.data) {
                    const new_stats = [
                        { id: 1, label: "Total Retailers", counts: data.data.retailerCount, revenue: 0, icon: <BsPersonCheck size={30} /> },
                        { id: 2, label: "Total Orders", counts: data.data.totalOrders, revenue: 0, icon: <MdReceiptLong size={30} /> },
                        { id: 3, label: "Total Delivered", counts: data.data.totalDelivered, revenue: 0, icon: <TbTruckDelivery size={30} /> },
                        { id: 4, label: "Total Revenue", counts: 0, revenue: data.data.totalRevenue.toFixed(0), icon: <MdOutlinePriceChange size={30} /> },
                    ];

                    setStats(new_stats);
                } else {
                    setError("Invalid data format.");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Failed to load data');
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const chartData = {
        labels: stats.map((stat) => stat.label),
        datasets: [
            {
                label: "Counts",
                data: stats.map((stat) => stat.counts || 0), // Fallback to 0 if counts are missing
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
                yAxisID: "y",
            },
            {
                label: "Revenue ($)",
                data: stats.map((stat) => stat.revenue || 0), // Fallback to 0 if revenue is missing
                backgroundColor: "rgba(138, 43, 226, 0.5)",
                borderColor: "rgba(138, 43, 226, 1)",
                borderWidth: 1,
                yAxisID: "y1",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                backgroundColor: "#1F2937",
                titleColor: "#FFFFFF",
                bodyColor: "#F3F4F6",
                cornerRadius: 5,
            },
        },
        scales: {
            x: {
                type: 'category', // Ensure x-axis is using 'category' scale
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#4B5563",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                type: "linear",
                position: "left",
                title: {
                    display: true,
                    text: "Counts",
                    color: "#2563EB",
                },
                grid: {
                    color: "#E5E7EB",
                },
                ticks: {
                    color: "#2563EB",
                    beginAtZero: true,
                },
            },
            y1: {
                type: "linear",
                position: "right",
                title: {
                    display: true,
                    text: "Revenue ($)",
                    color: "#8A2BE2",
                },
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    color: "#8A2BE2",
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <>
            <div className="flex flex-nowrap justify-center gap-6 px-6 py-4 bg-gray-100 w-full max-w-full">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="flex items-center justify-between w-1/4 min-w-[150px] p-4 bg-white rounded-lg shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-emerald-400 rounded-full">
                                {stat.icon || <span>No Icon</span>} {/* Fallback in case icon is missing */}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-emerald-400">
                                    {stat.id === 4 ? stat.revenue : stat.counts}
                                </h3>
                                <p className="text-sm text-gray-600 font-bold">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-100 w-full max-w-full mb-3">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Business Summary</h2>
                    <div className="h-[400px]">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
