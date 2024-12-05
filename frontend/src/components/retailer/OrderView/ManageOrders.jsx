import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import Pagination from "../Helper/pagination.jsx";

const OrdersTable = () => {
    const [orders, setOrders] = useState([
        { id: "01", name: "Tu", email: "tu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776789", status: "Pending" },
        { id: "02", name: "Tu", email: "tu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776789", status: "Pending" },
        { id: "03", name: "Tu", email: "tu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776789", status: "Pending" },
        { id: "04", name: "Van Tu", email: "vantu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776781", status: "Completed" },
        { id: "05", name: "Van Tu", email: "vantu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776781", status: "Completed" },
        { id: "06", name: "Van Tu", email: "vantu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776781", status: "Completed" },
        { id: "07", name: "Tu Nguyen", email: "tunguyen@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776782", status: "Pending" },
        { id: "08", name: "Tu Nguyen", email: "tunguyen@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776782", status: "Pending" },
        { id: "09", name: "Tu Nguyen", email: "tunguyen@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776782", status: "Pending" },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleViewClick = () => {
        alert("View Button Clicked!");
    };

    const handleEditClick = () => {
        alert("Edit Button Clicked!");
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedVoucher(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== selectedVoucher)
        );
        setIsModalOpen(false);
        setSelectedVoucher(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVoucher(null);
    };

    const renderItems = (currentItems) => (
        <div className="overflow-hidden rounded-xl shadow-lg bg-white">
            <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-center font-semibold">ID</th>
                        <th className="px-6 py-3 text-center font-semibold">Name</th>
                        <th className="px-6 py-3 text-center font-semibold">Email</th>
                        <th className="px-6 py-3 text-center font-semibold">Address</th>
                        <th className="px-6 py-3 text-center font-semibold">Phone</th>
                        <th className="px-6 py-3 text-center font-semibold">Status</th>
                        <th className="px-6 py-3 text-center font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td className="px-6 py-4 text-center">{order.id}</td>
                            <td className="px-6 py-4 text-center">{order.name}</td>
                            <td className="px-6 py-4 text-center">{order.email}</td>
                            <td className="px-6 py-4 text-center">{order.address}</td>
                            <td className="px-6 py-4 text-center">{order.phone}</td>
                            <td className="px-6 py-4 text-center">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={`rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${order.status === "Pending"
                                        ? "bg-gray-200 text-black"
                                        : "bg-amber-200 text-black"
                                        }`}
                                >
                                    <option value="Pending" className="text-center">Pending</option>
                                    <option value="Completed" className="text-center">Completed</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex space-x-4 justify-center">
                                    <button className="hover:text-blue-500 transition-all" onClick={handleViewClick}>
                                        <FaEye size={20} />
                                    </button>

                                    <button className="hover:text-blue-500 transition-all" onClick={handleEditClick}>
                                        <FaPen size={20} />
                                    </button>

                                    <button
                                        className="hover:text-red-500 transition-all"
                                        onClick={() => handleDeleteClick(order.id)}
                                    >
                                        <FaTrash size={20} />
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
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-center items-center">
                            <TiDeleteOutline size={150} color="red"/>
                        </div>
                        <p className="text-lg font-semibold mb-4">Are you sure want to delete this order?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded font-bold"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded font-bold"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;