import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const stats = [
        { id: 1, label: "Total Retailers", counts: 15, revenue: 0 },
        { id: 2, label: "Total Orders", counts: 357, revenue: 0 },
        { id: 3, label: "Total Delivered", counts: 75, revenue: 0 },
        { id: 4, label: "Total Revenue", counts: 0, revenue: 128 },
    ];

    const chartData = {
        labels: stats.map((stat) => stat.label),
        datasets: [
            {
                label: "Counts",
                data: stats.map((stat) => stat.counts),
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
                yAxisID: "y",
            },
            {
                label: "Revenue ($)",
                data: stats.map((stat) => stat.revenue),
                backgroundColor: "rgba(234, 88, 12, 0.5)",
                borderColor: "rgba(234, 88, 12, 1)",
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
                    color: "#EA580C",
                },
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    color: "#EA580C",
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <div className="p-4 bg-gray-100 w-full max-w-full mb-3">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
                <h2 className="text-lg font-bold mb-4">Business Summary</h2>
                <div className="h-[400px]">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
