import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Pagination from "../Helper/pagination.jsx";
import AddProduct from "../Helper/AddProduct.jsx";

const ManageProducts = ({ products, onProductsChange }) => {
    const [isAddVisible, setIsAddVisible] = useState(false);

    const handleViewClick = () => alert("View Button Clicked!");
    const handleEditClick = () => alert("Edit Button Clicked!");
    const handleDeleteClick = () => alert("Delete Button Clicked!");

    const handleAddClick = () => setIsAddVisible(true);
    const handleCloseAdd = () => setIsAddVisible(false);

    const handleAddProduct = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        onProductsChange(updatedProducts); 
    };

    const renderItems = (currentItems) => (
        <div className="overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full bg-white">
                <caption className="text-lg font-semibold py-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
                    <div className="flex justify-between items-center px-6">
                        <p className="text-xl font-bold">List Products</p>
                        <button
                            onClick={handleAddClick}
                            className="bg-emerald-600 text-white py-2 px-6 text-sm rounded-lg shadow-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
                        >
                            Add Product
                        </button>
                    </div>
                </caption>
                <thead className="bg-emerald-500 text-white">
                    <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        <th className="px-6 py-3 text-left font-medium font-extrabold">Name</th>
                        <th className="px-6 py-3 text-left font-medium font-extrabold text-center">Category</th>
                        <th className="px-6 py-3 text-left font-medium font-extrabold text-center">Size</th>
                        <th className="px-6 py-3 text-left font-medium font-extrabold text-center">Cost</th>
                        <th className="px-6 py-3 text-left font-medium font-extrabold text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((product, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-6 py-4 font-bold">{product.name}</td>
                            <td className="px-6 py-4 text-center">
                                <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white font-bold">
                                    {product.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white font-bold">
                                    {product.size}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold">{product.cost}</td>
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
    );

    return (
        <div className="px-5 py-0">
            <Pagination data={products} itemsPerPage={5} renderItems={renderItems} />
            <AddProduct
                isVisible={isAddVisible}
                onClose={handleCloseAdd}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default ManageProducts;
