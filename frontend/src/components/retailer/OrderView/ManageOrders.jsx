import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const OrdersTable = () => {
    const [orders, setOrders] = useState([
        { id: "01", name: "Tu", email: "tu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776789", status: "Pending" },
        { id: "02", name: "Tu", email: "tu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776789", status: "Pending" },
        { id: "03", name: "Tu", email: "tu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776789", status: "Pending" },
        { id: "04", name: "Van Tu", email: "vantu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776781", status: "Confirmed" },
        { id: "05", name: "Van Tu", email: "vantu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776781", status: "Confirmed" },
        { id: "06", name: "Van Tu", email: "vantu@gmail.com", address: "123 Nguyen Van Cu", phone: "0987776781", status: "Confirmed" },
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
        <div className="px-5 py-0">
            <div className="overflow-hidden rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                    <caption className="text-lg font-bold pb-2 pt-4 bg-white">
                        <div className="flex justify-between items-center pl-6 pr-3">
                            <p>List Orders</p>
                        </div>
                    </caption>
                    <thead className="bg-emerald-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">ID</th>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">Name</th>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">Email</th>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">Address</th>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">Phone</th>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">Status</th>
                            <th className="px-6 py-3 text-left font-medium font-extrabold text-center font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-6 py-4 text-center text-sm">{order.id}</td>
                                <td className="px-6 py-4 text-center text-sm">{order.name}</td>
                                <td className="px-6 py-4 text-center text-sm">{order.email}</td>
                                <td className="px-6 py-4 text-center text-sm">{order.address}</td>
                                <td className="px-6 py-4 text-center text-sm">{order.phone}</td>
                                <td className="px-6 py-4 text-center text-sm">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`border border-gray-300 rounded px-2 py-1 text-sm focus:bg-white focus:text-black ${order.status === "Pending"
                                                ? "bg-gray-200 text-black"
                                                : order.status === "Confirmed"
                                                    ? "bg-amber-200"
                                                    : "bg-emerald-200"
                                            }`}
                                        onBlur={(e) => {
                                            e.target.classList.remove("bg-white", "text-black");
                                            e.target.classList.add(
                                                order.status === "Pending"
                                                    ? "bg-gray-200 text-black"
                                                    : order.status === "Confirmed"
                                                        ? "bg-amber-200"
                                                        : "bg-emerald-200"
                                            );
                                        }}
                                    >
                                        <option value="Pending" className="text-center">Pending</option>
                                        <option value="Confirmed" className="text-center">Confirmed</option>
                                        <option value="Done" className="text-center">Done</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex space-x-4 justify-center">
                                        <button className="hover:text-blue-500" onClick={handleViewClick}>
                                            <FaEye size={20} />
                                        </button>
                                        <button className="hover:text-blue-500" onClick={handleEditClick}>
                                            <FaPen size={20} />
                                        </button>
                                        <button className="hover:text-blue-500" onClick={handleDeleteClick}>
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
                    previousClassName={`px-3 py-1 rounded-lg ${currentPage === 0 ? "cursor-not-allowed text-gray-100" : "bg-white hover:bg-white"}`}
                    nextClassName={`px-3 py-1 rounded-lg ${currentPage === pageCount - 1 ? "cursor-not-allowed text-gray-100" : "bg-white hover:bg-white"}`}
                    activeClassName={"px-3 py-1 bg-gray-300 text-black rounded"}
                    pageClassName={"px-3 py-1 rounded text-neutral-400 font-bold"}
                    disabledClassName={"cursor-not-allowed"}
                />
            </div>
        </div>
    );
};

export default OrdersTable;
