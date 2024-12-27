import React, { useState } from "react";
import axios from "axios";

const addProduct = async (token, product) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/addproduct`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
};

const AddProduct = ({ isVisible, onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        stock_quantity: "",
        rating: "",
        image_url: "",
        target: "",
        category: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { name, description, price, size, stock_quantity, rating, image_url, target, category } = newProduct;
        if (!name || !description || !price || !size || !stock_quantity || !rating || !image_url || !target || !category) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); 
            const response = await addProduct(token, newProduct);

            if (response.status === 200) {
                alert("Product added successfully!");
                setNewProduct({
                    name: "",
                    description: "",
                    price: "",
                    size: "",
                    stock_quantity: "",
                    rating: "",
                    image_url: "",
                    target: "",
                    category: ""
                });
                onClose();
            } else {
                alert("Failed to add product. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-10" onClick={onClose}></div>
            <div className="fixed inset-0 flex justify-center items-center z-20">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Add Product</h3>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Description<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Price<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Size<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="size"
                                    value={newProduct.size}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Stock Quantity<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="stock_quantity"
                                    value={newProduct.stock_quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Rating<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="rating"
                                    value={newProduct.rating}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Image URL<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="image_url"
                                    value={newProduct.image_url}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Target<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="target"
                                    value={newProduct.target}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Category ID<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
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
        </>
    );
};

export default AddProduct;
