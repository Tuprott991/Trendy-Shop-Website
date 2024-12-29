import React, { useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { retailerService } from "../../../services/retailerService";
import axios from "axios";
import Pagination from "../Helper/pagination.jsx";

const ManageProducts = ({ products, onProductsChange }) => {
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        stock_quantity: "",
        image_url: "",
        target: "",
        category: "",
    });

    const [editProduct, setEditProduct] = useState({});

    const handleAddClick = () => setIsAddVisible(true);
    const handleCloseAdd = () => setIsAddVisible(false);

    const handleEditClick = (productId) => {
        const productToEdit = products.find((product) => product._id === productId);
        setEditProduct(productToEdit);
        setIsEditVisible(true);
    };

    const handleCloseEdit = () => setIsEditVisible(false);

    const handleAddProduct = async (product) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:8080/api/retailer/addproduct", product, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                alert("Product added successfully!");
                const data = await retailerService.getDashboard(token);
                if (data?.data) {
                    onProductsChange(data.data.productList);
                    handleCloseAdd();
                }
            } else {
                alert("Failed to add product. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const handleUpdateProduct = async (product) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`http://localhost:8080/api/retailer/updateproduct`, product);
            if (response.status === 200) {
                alert("Product updated successfully!");
                const data = await retailerService.getDashboard(token);
                if (data?.data) {
                    onProductsChange(data.data.productList);
                    handleCloseEdit();
                }
            } else {
                alert("Failed to update product. Please try again.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await retailerService.deleteProduct(productId);
            const updatedProducts = products.filter((product) => product._id !== productId);
            onProductsChange(updatedProducts);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [id]: value }));
        setEditProduct((prev) => ({ ...prev, [id]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { name, description, price, size, stock_quantity, image_url, target, category } = newProduct;
        if (!name || !description || !price || !size || !stock_quantity || !image_url || !target || !category) {
            alert("Please fill out all fields.");
            return;
        }
        handleAddProduct(newProduct);
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        const { name, description, price, size, stock_quantity, image_url } = editProduct;
        if (!name || !description || !price || !size || !stock_quantity || !image_url) {
            alert("Please fill out all fields.");
            return;
        }
        editProduct.category = "", editProduct.target = "";
        handleUpdateProduct(editProduct);
    };

    const renderItems = (currentItems) => (
        <div className="overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full bg-white">
                <caption className="text-lg font-semibold py-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
                    <div className="flex justify-between items-center px-6">
                        <p className="text-xl font-bold">Product List</p>
                        <button
                            onClick={handleAddClick}
                            className="bg-emerald-600 text-white py-2 px-6 text-sm rounded-lg hover:bg-emerald-700 transition duration-300"
                        >
                            Add Product
                        </button>
                    </div>
                </caption>
                <thead className="bg-emerald-500 text-white">
                    <tr>
                        <th className="px-6 py-3 font-medium">Product Name</th>
                        <th className="px-6 py-3 font-medium text-center">Category</th>
                        <th className="px-6 py-3 font-medium text-center">Size</th>
                        <th className="px-6 py-3 font-medium text-center">Price</th>
                        <th className="px-6 py-3 font-medium text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((product) => (
                        <tr key={product._id} className="border-b">
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4 text-center">{product.category_id.category}</td>
                            <td className="px-6 py-4 text-center">{product.size}</td>
                            <td className="px-6 py-4 text-center">{product.price}</td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => handleEditClick(product._id)}
                                    className="text-black hover:text-blue-500 mr-4"
                                >
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="text-black hover:text-red-500"
                                >
                                    <FaTrash />
                                </button>
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

            {/* Modal Add Product */}
            {isAddVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-10" onClick={handleCloseAdd}>
                    <div
                        className="fixed inset-0 flex justify-center items-center z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Add Product</h3>
                            <form onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(newProduct).map((key) => {
                                        return (
                                            <div key={key} className="col-span-1">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={key}
                                                    value={newProduct[key]}
                                                    onChange={handleInputChange}
                                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseAdd}
                                        className="py-2 px-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-300 font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 font-bold"
                                    >
                                        Ok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Edit Product */}
            {isEditVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-10" onClick={handleCloseEdit}>
                    <div
                        className="fixed inset-0 flex justify-center items-center z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Product</h3>
                            <form onSubmit={handleEditFormSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(editProduct).map((key) => {
                                        if (key !== "_id" && key !== "category_id" && key !== "user_id" && key !== "createdAt" && key !== "__v" && key !== "updatedAt" && key !== "rating") { 
                                            return (
                                                <div key={key} className="col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}<span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={key}
                                                        value={editProduct[key] || ""}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                                    />
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseEdit}
                                        className="py-2 px-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-300 font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 font-bold"
                                    >
                                        Ok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
