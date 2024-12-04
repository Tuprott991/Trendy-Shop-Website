import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

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

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const offset = currentPage * itemsPerPage;
    const currentItems = orders.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(orders.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

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

    const handleDeleteClick = () => {
        alert("Delete Button Clicked!");
    };

    return (
        <div className="px-6 py-5">
            <div className="overflow-hidden rounded-xl shadow-lg bg-white">
                <table className="min-w-full table-auto">
                    <caption className="text-lg font-bold pb-4 pt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white">
                        <div className="flex justify-between items-center pl-6 pr-3">
                            <p className="text-xl">Orders List</p>
                        </div>
                    </caption>
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
                                        <button className="hover:text-red-500 transition-all" onClick={handleDeleteClick}>
                                            <FaTrash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center mt-5">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex space-x-2"}
                    previousClassName={`px-4 py-2 rounded-lg ${currentPage === 0 ? "cursor-not-allowed text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    nextClassName={`px-4 py-2 rounded-lg ${currentPage === pageCount - 1 ? "cursor-not-allowed text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    activeClassName={"px-4 py-2 bg-gray-300 text-white rounded"}
                    pageClassName={"px-4 py-2 rounded text-neutral-400 font-bold"}
                    disabledClassName={"cursor-not-allowed"}
                />
            </div>
        </div>
    );
};

export default OrdersTable;
