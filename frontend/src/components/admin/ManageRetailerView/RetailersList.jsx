import React, { useState, useEffect } from "react";
import { CgTrash } from "react-icons/cg";
import { TiDeleteOutline } from "react-icons/ti";
import Pagination from "../Helper/pagination.jsx";
import { adminService } from "../../../services/adminService";

const RetailersTable = () => {
    const [retailers, setRetailers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRetailer, setSelectedRetailer] = useState(null);

    useEffect(() => {
        const fetchRetailers = async () => {
            try {
                const response = await adminService.getManageRetailer();
                const data = response.data.retailers;
                setRetailers(data || []);
            } catch (error) {
                console.error("Failed to fetch retailers:", error);
            }
        };

        fetchRetailers();
    }, []);

    const handleDeleteClick = (id) => {
        setSelectedRetailer(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedRetailer) return;
        try {
            const response = await adminService.deleteRetailer(selectedRetailer);
            if (response.status === 200) {
                alert("Retailer has been successfully deleted.");
                setRetailers((prevRetailers) =>
                    prevRetailers.filter((retailer) => retailer._id !== selectedRetailer)
                );
            } else {
                const errorData = await response.json();
                console.error("Error when deleting:", errorData);
                alert("Unable to delete retailer. Please try again.");
            }
        } catch (error) {
            console.error("Error when sending request:", error);
            alert("An error occurred. Please check your network connection.");
        } finally {
            setIsModalOpen(false);
            setSelectedRetailer(null);
        }
    };    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRetailer(null);
    };

    const renderItems = (currentItems) => (
        <div className="overflow-hidden rounded-xl shadow-lg bg-white">
            <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-center font-semibold">Name</th>
                        <th className="px-6 py-3 text-center font-semibold">Email</th>
                        <th className="px-6 py-3 text-center font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((retailer) => (
                        <tr
                            key={retailer.id}
                            className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                        >
                            <td className="px-6 py-4 text-center">{retailer.name}</td>
                            <td className="px-6 py-4 text-center">{retailer.email}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex space-x-4 justify-center">
                                    <button
                                        className="hover:text-red-500 transition-all"
                                        onClick={() => handleDeleteClick(retailer._id)}
                                    >
                                        <CgTrash size={25} color="red" />
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
            <Pagination data={retailers} itemsPerPage={5} renderItems={renderItems} />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-center items-center">
                            <TiDeleteOutline size={150} color="red" />
                        </div>
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this retailer?</p>
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

export default RetailersTable;
