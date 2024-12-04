import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const VoucherList = () => {
    const [vouchers, setVouchers] = useState([
        { id: "01", name: "voucher01", description: "voucher01", discount: 50, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "02", name: "voucher02", description: "voucher02", discount: 10, upToDate: "30 Nov 2024", status: "Complete" },
        { id: "03", name: "voucher03", description: "voucher03", discount: 20, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "01", name: "voucher01", description: "voucher01", discount: 50, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "02", name: "voucher02", description: "voucher02", discount: 10, upToDate: "30 Nov 2024", status: "Complete" },
        { id: "03", name: "voucher03", description: "voucher03", discount: 20, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "01", name: "voucher01", description: "voucher01", discount: 50, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "02", name: "voucher02", description: "voucher02", discount: 10, upToDate: "30 Nov 2024", status: "Complete" },
        { id: "03", name: "voucher03", description: "voucher03", discount: 20, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "01", name: "voucher01", description: "voucher01", discount: 50, upToDate: "30 Nov 2024", status: "Incomplete" },
        { id: "02", name: "voucher02", description: "voucher02", discount: 10, upToDate: "30 Nov 2024", status: "Complete" },
        { id: "03", name: "voucher03", description: "voucher03", discount: 20, upToDate: "30 Nov 2024", status: "Incomplete" },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const offset = currentPage * itemsPerPage;
    const currentItems = vouchers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(vouchers.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleStatusChange = (id, newStatus) => {
        setVouchers((prevVouchers) =>
            prevVouchers.map((voucher) =>
                voucher.id === id ? { ...voucher, status: newStatus } : voucher
            )
        );
    };

    const handleAddClick = () => {
        console.log("Add clicked");
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
                            <p className="text-xl">Voucher List</p>
                            <button
                                onClick={handleAddClick}
                                className="bg-green-500 text-white py-2 px-5 text-sm rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                            >
                                Add Voucher
                            </button>
                        </div>
                    </caption>
                    <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-center font-semibold">ID</th>
                            <th className="px-6 py-3 text-center font-semibold">Name</th>
                            <th className="px-6 py-3 text-center font-semibold">Description</th>
                            <th className="px-6 py-3 text-center font-semibold">Discount (%)</th>
                            <th className="px-6 py-3 text-center font-semibold">Up-to-date</th>
                            <th className="px-6 py-3 text-center font-semibold">Status</th>
                            <th className="px-6 py-3 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((voucher, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                                <td className="px-6 py-4 text-center">{voucher.id}</td>
                                <td className="px-6 py-4 text-center">{voucher.name}</td>
                                <td className="px-6 py-4 text-center">{voucher.description}</td>
                                <td className="px-6 py-4 text-center">{voucher.discount}</td>
                                <td className="px-6 py-4 text-center">{voucher.upToDate}</td>
                                <td className="px-6 py-4 text-center">
                                    <select
                                        value={voucher.status}
                                        onChange={(e) => handleStatusChange(voucher.id, e.target.value)}
                                        className={`rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${voucher.status === "Complete"
                                            ? "bg-green-200 text-black"
                                            : "bg-yellow-200 text-black"
                                            }`}
                                    >
                                        <option value="Complete">Complete</option>
                                        <option value="Incomplete">Incomplete</option>
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

export default VoucherList;
