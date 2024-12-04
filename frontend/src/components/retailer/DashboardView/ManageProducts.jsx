import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const App = () => {
    const products = [
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
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleAddClick = () => {
        alert("Button Clicked!");
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
                    <caption className="text-lg font-bold py-2 bg-white">
                        <div class="flex flex justify-between items-center pl-6 pr-3">
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
