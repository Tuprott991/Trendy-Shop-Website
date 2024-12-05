import React, { useState } from "react";

const AddProduct = ({ isVisible, onClose, onAddProduct }) => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        size: "",
        cost: "",
        description: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { name, category, size, cost, description } = newProduct;
        if (!name || !category || !size || !cost || !description) {
            alert("Please fill out all fields.");
            return;
        }
        onAddProduct(newProduct); // Gọi hàm thêm sản phẩm
        setNewProduct({ name: "", category: "", size: "", cost: "", description: "" }); // Reset các trường
        onClose(); // Đóng form sau khi thêm sản phẩm
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
                                <label className="block text-sm font-medium text-gray-700">Category<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="category"
                                    value={newProduct.category}
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
                                <label className="block text-sm font-medium text-gray-700">Cost<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="cost"
                                    value={newProduct.cost}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Description<span className="text-red-500">*</span></label>
                                <textarea
                                    id="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                    rows="3"
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
