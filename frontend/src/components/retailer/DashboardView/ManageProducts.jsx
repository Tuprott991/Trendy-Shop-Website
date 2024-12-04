import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const App = () => {
    const [products, setProducts] = useState([
        { name: "Gradient Graphic T-shirt", category: "Shirt", cost: "$128" },
        { name: "Polo with Tipping Details", category: "Shirt", cost: "$128" },
        { name: "Black Striped T-shirt", category: "Shirt", cost: "$128" },
        { name: "Skinny Fit Jeans", category: "Jeans", cost: "$128" },
        { name: "Checkered Shirt", category: "Shirt", cost: "$128" },
        { name: "Gradient Graphic T-shirt", category: "Shirt", cost: "$128" },
        { name: "Gradient Graphic T-shirt", category: "Shirt", cost: "$128" },
        { name: "Polo with Tipping Details", category: "Shirt", cost: "$128" },
        { name: "Polo with Tipping Details", category: "Shirt", cost: "$128" },
        { name: "Black Striped T-shirt", category: "Shirt", cost: "$128" },
        { name: "Black Striped T-shirt", category: "Shirt", cost: "$128" },
        { name: "Skinny Fit Jeans", category: "Jeans", cost: "$128" },
        { name: "Skinny Fit Jeans", category: "Jeans", cost: "$128" },
        { name: "Checkered Shirt", category: "Shirt", cost: "$128" },
        { name: "Checkered Shirt", category: "Shirt", cost: "$128" },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        size: "",
        cost: "",
        description: ""
    });

    const itemsPerPage = 5;

    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleAddClick = () => {
        setIsAddVisible(true);
    };

    const handleCloseAdd = () => {
        setIsAddVisible(false);
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
        setProducts([...products, newProduct]);
        setIsAddVisible(false);
        setNewProduct({ name: "", category: "", size: "", cost: "", description: "" });
    };


    return (
        <div className="px-5 py-0">
            <div className="overflow-hidden rounded-lg shadow-md">
                <table className="min-w-full bg-white">
                    <caption className="text-lg font-bold py-2 bg-white">
                        <div className="flex justify-between items-center pl-6 pr-3">
                            <p>List Products</p>
                            <button
                                onClick={handleAddClick}
                                className="bg-emerald-500 text-white py-1 px-3 text-sm rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Add Product
                            </button>
                        </div>
                    </caption>
                    <thead className="bg-emerald-500 text-white">
                        <tr>
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
                                    <div className="flex justify-center items-center">
                                        <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white font-bold">
                                            {product.category}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex space-x-4 justify-center">
                                        <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white font-bold">S</span>
                                        <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white font-bold">M</span>
                                        <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white font-bold">L</span>
                                    </div>
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

            {isAddVisible && (
                <>
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-10" onClick={handleCloseAdd}></div>
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
                                        onClick={handleCloseAdd}
                                        className="py-2 px-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Ok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
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

export default App;
