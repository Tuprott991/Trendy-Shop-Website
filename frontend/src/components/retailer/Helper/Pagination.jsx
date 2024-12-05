import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ data, itemsPerPage, renderItems }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;
    const currentItems = data.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            {renderItems(currentItems)}
            <div className="flex justify-center items-center mt-5">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex space-x-2"}
                    previousClassName={`px-4 py-2 rounded-lg ${
                        currentPage === 0 ? "cursor-not-allowed text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    nextClassName={`px-4 py-2 rounded-lg ${
                        currentPage === pageCount - 1 ? "cursor-not-allowed text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    activeClassName={"px-4 py-2 bg-gray-300 text-white rounded"}
                    pageClassName={"px-4 py-2 rounded text-neutral-400 font-bold"}
                    disabledClassName={"cursor-not-allowed"}
                />
            </div>
        </>
    );
};

export default Pagination;