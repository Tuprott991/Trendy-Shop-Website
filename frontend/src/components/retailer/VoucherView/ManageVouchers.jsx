import React, { useState, useEffect } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import Pagination from "../Helper/pagination.jsx";
import { retailerService } from "../../../services/retailerService";

const VouchersTable = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [newVoucher, setNewVoucher] = useState({
        code: "",
        description: "",
        discount_value: 0,
        valid_from: "",
        valid_to: "",
        minimum_order_value: 0,
        max_uses: 1,
        status: "Inactive",
    });

    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await retailerService.getVoucher(token);
                if (response?.data) {
                    const data = response.data;
                    setVouchers(data);
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };
        fetchVouchers();
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setVouchers((prevVouchers) =>
            prevVouchers.map((voucher) =>
                voucher.id === id ? { ...voucher, status: newStatus } : voucher
            )
        );
    };

    const handleAddVoucher = () => {
        setIsAddModalOpen(true);
    };

    const handleAddVoucherSubmit = async () => {
        const voucherData = { ...newVoucher };
        try {
            const response = await retailerService.addVoucher(token, voucherData);
            console.log(response)
        } catch {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
        setVouchers([...vouchers, { ...newVoucher, id: Date.now() }]);
        setIsAddModalOpen(false);
        setNewVoucher({
            code: "",
            description: "",
            discount_value: 0,
            valid_from: "",
            valid_to: "",
            minimum_order_value: 0,
            max_uses: 1,
            status: "Inactive",
        });
    };

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
    };

    const handleViewVoucher = () => {
        setIsViewModalOpen(true);
    };

    const handleViewModalClose = () => {
        setIsViewModalOpen(false);
    };

    const handleEditClick = () => {
        alert("Edit Button Clicked!");
    };

    const handleDeleteClick = (id) => {
        setSelectedVoucherId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setVouchers((prevVouchers) =>
            prevVouchers.filter((voucher) => voucher.id !== selectedVoucherId)
        );
        setIsModalOpen(false);
        setSelectedVoucherId(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVoucherId(null);
    };

    const renderItems = (currentItems) => (
        <div className="overflow-hidden rounded-xl shadow-lg bg-white">
            <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-center font-semibold">Code</th>
                        <th className="px-6 py-3 text-center font-semibold">Description</th>
                        <th className="px-6 py-3 text-center font-semibold">Discount Value</th>
                        <th className="px-6 py-3 text-center font-semibold">Max Uses</th>
                        <th className="px-6 py-3 text-center font-semibold">Status</th>
                        <th className="px-6 py-3 text-center font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((voucher) => (
                        <tr key={voucher.id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td className="px-6 py-4 text-center">{voucher.code}</td>
                            <td className="px-6 py-4 text-center">{voucher.description}</td>
                            <td className="px-6 py-4 text-center">{voucher.discount_value}</td>
                            <td className="px-6 py-4 text-center">{voucher.max_uses}</td>
                            <td className="px-6 py-4 text-center">
                                <select
                                    value={voucher.status}
                                    onChange={(e) => handleStatusChange(voucher.id, e.target.value)}
                                    className={`rounded px-3 py-1.5 text-sm ${voucher.status === "Inactive"
                                        ? "bg-gray-200 text-black"
                                        : "bg-amber-200 text-black"
                                        }`}
                                >
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex space-x-4 justify-center">
                                    <button className="hover:text-gray-800 transition-all" onClick={handleViewClick}>
                                        <FaEye size={20} />
                                    </button>
                                    <button className="hover:text-gray-800 transition-all" onClick={handleEditClick}>
                                        <FaPen size={20} />
                                    </button>
                                    <button
                                        className="hover:text-red-500 transition-all"
                                        onClick={() => handleDeleteClick(voucher.id)}
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
            <div className="mb-4 flex justify-end">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600"
                    onClick={handleAddVoucher}
                >
                    Add Voucher
                </button>
            </div>
            <Pagination
                data={vouchers}
                itemsPerPage={5}
                renderItems={renderItems}
            />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-center items-center">
                            <TiDeleteOutline size={150} color="red" />
                        </div>
                        <p className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this voucher?
                        </p>
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
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Add New Voucher</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Code"
                                value={newVoucher.code}
                                onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newVoucher.description}
                                onChange={(e) => setNewVoucher({ ...newVoucher, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Discount Value"
                                value={newVoucher.discount_value}
                                onChange={(e) => setNewVoucher({ ...newVoucher, discount_value: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Valid From"
                                value={newVoucher.valid_from}
                                onChange={(e) => setNewVoucher({ ...newVoucher, valid_from: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Valid To"
                                value={newVoucher.valid_to}
                                onChange={(e) => setNewVoucher({ ...newVoucher, valid_to: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Minimum Order Value"
                                value={newVoucher.minimum_order_value}
                                onChange={(e) => setNewVoucher({ ...newVoucher, minimum_order_value: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Uses"
                                value={newVoucher.max_uses}
                                onChange={(e) => setNewVoucher({ ...newVoucher, max_uses: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded font-bold"
                                onClick={handleAddModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded font-bold"
                                onClick={handleAddVoucherSubmit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isViewModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Add New Voucher</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Code"
                                value={newVoucher.code}
                                onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newVoucher.description}
                                onChange={(e) => setNewVoucher({ ...newVoucher, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Discount Value"
                                value={newVoucher.discount_value}
                                onChange={(e) => setNewVoucher({ ...newVoucher, discount_value: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Valid From"
                                value={newVoucher.valid_from}
                                onChange={(e) => setNewVoucher({ ...newVoucher, valid_from: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Valid To"
                                value={newVoucher.valid_to}
                                onChange={(e) => setNewVoucher({ ...newVoucher, valid_to: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Minimum Order Value"
                                value={newVoucher.minimum_order_value}
                                onChange={(e) => setNewVoucher({ ...newVoucher, minimum_order_value: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Uses"
                                value={newVoucher.max_uses}
                                onChange={(e) => setNewVoucher({ ...newVoucher, max_uses: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded font-bold"
                                onClick={handleViewModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded font-bold"
                                onClick={handleAddVoucherSubmit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VouchersTable;
