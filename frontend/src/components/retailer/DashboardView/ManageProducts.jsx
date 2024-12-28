import React, { useState } from "react";
import Pagination from "../Helper/pagination.jsx";
import AddProduct from "../Helper/AddProduct.jsx";
import { FaTrash } from "react-icons/fa";
import { retailerService } from "../../../services/retailerService";

const ManageProducts = ({ products, onProductsChange }) => {
    const [isAddVisible, setIsAddVisible] = useState(false);

    const handleAddClick = () => setIsAddVisible(true);
    const handleCloseAdd = () => setIsAddVisible(false);

    const handleAddProduct = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        onProductsChange(updatedProducts);
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
                    {currentItems.map((product, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4 text-center">{product.category_id.category}</td>
                            <td className="px-6 py-4 text-center">{product.size}</td>
                            <td className="px-6 py-4 text-center">{product.price}</td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => handleDeleteProduct(product._id)} // Call delete function
                                    className="text-red-500 hover:text-red-700"
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
            <AddProduct
                isVisible={isAddVisible}
                onClose={handleCloseAdd}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default ManageProducts;
