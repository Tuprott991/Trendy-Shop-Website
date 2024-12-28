import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import Pagination from "../Helper/pagination.jsx";
import { retailerService } from "../../../services/retailerService";

const OrdersTable = () => {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await retailerService.getOrders(token);
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        try {
            console.log(id);
            const response = await retailerService.updateOrderStatus(id, newStatus);
            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? { ...order, status: newStatus } : order
                    )
                );
                alert("Status updated successfully!");
            } else {
                console.error("Failed to update status.");
                alert("Failed to update status!");
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert("An error occurred while updating status.");
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const renderItems = (currentItems) => (
        <div className="overflow-hidden rounded-xl shadow-lg bg-white">
            <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-center font-semibold">Name</th>
                        <th className="px-6 py-3 text-center font-semibold">Address</th>
                        <th className="px-6 py-3 text-center font-semibold">Phone</th>
                        <th className="px-6 py-3 text-center font-semibold">Status</th>
                        <th className="px-6 py-3 text-center font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td className="px-6 py-4 text-center">{order.name}</td>
                            <td className="px-6 py-4 text-center">{order.address}</td>
                            <td className="px-6 py-4 text-center">{order.phone}</td>
                            <td className="px-6 py-4 text-center">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className={`rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${order.status === "Pending"
                                        ? "bg-gray-200 text-black"
                                        : "bg-amber-200 text-black"
                                        }`}
                                    disabled={loadingStates[order.id]}
                                >
                                    <option value="pending" className="text-center">Pending</option>
                                    <option value="deliveried" className="text-center">Delivered</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex space-x-4 justify-center">
                                    <button className="hover:text-blue-500 transition-all" onClick={() => handleViewClick(order)}>
                                        <FaEye size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="px-6 py-5">
            <Pagination
                data={orders}
                itemsPerPage={5}
                renderItems={renderItems}
            />

            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full space-y-6">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-6">Order Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-y-2">
                                    <p className="text-gray-700 font-medium">Name</p>
                                    <p className="text-gray-800 border-[1px] border-gray-300 py-2 px-4 rounded-xl">{selectedOrder.name}</p>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <p className="text-gray-700 font-medium">Phone</p>
                                    <p className="text-gray-800 border-[1px] border-gray-300 py-2 px-4 rounded-xl">{selectedOrder.phone}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <p className="text-gray-700 font-medium">Address</p>
                                <p className="text-gray-800 border-[1px] border-gray-300 py-2 px-4 rounded-xl">{selectedOrder.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-y-2">
                                    <p className="text-gray-700 font-medium">Total Money</p>
                                    <p className="text-gray-800 border-[1px] border-gray-300 py-2 px-4 rounded-xl">{selectedOrder.total_money}</p>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <p className="text-gray-700 font-medium">Payment Method</p>
                                    <p className="text-gray-800 border-[1px] border-gray-300 py-2 px-4 rounded-xl">{selectedOrder.payment_method}</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-700 font-medium">Status</p>
                                <p className="text-gray-800 border-[1px] border-gray-300 py-2 px-4 rounded-xl">{selectedOrder.status}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
