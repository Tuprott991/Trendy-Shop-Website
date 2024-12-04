import React, { useState } from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const VoucherList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [vouchers, setVouchers] = useState([
    { id: '01', name: 'voucher01', description: 'voucher01', discount: 50, upToDate: '30 Nov 2024', status: 'Incomplete' },
    { id: '02', name: 'voucher02', description: 'voucher02', discount: 10, upToDate: '30 Nov 2024', status: 'Complete' },
    { id: '03', name: 'voucher03', description: 'voucher03', discount: 20, upToDate: '30 Nov 2024', status: 'Incomplete' },
  ]);

  const itemsPerPage = 3;
  const pageCount = Math.ceil(vouchers.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleAddClick = () => {
    console.log('Add clicked');
  };

  const handleStatusChange = (id, newStatus) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === id ? { ...voucher, status: newStatus } : voucher
      )
    );
  };

  const currentItems = vouchers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="px-5 py-0">
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <caption className="text-lg font-bold pb-2 pt-4 bg-white">
            <div className="flex justify-between items-center pl-6 pr-3 my-2">
              <p>List Vouchers</p>
              <button
                onClick={handleAddClick}
                className="bg-emerald-500 text-white py-1 px-3 text-sm rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Add Voucher
              </button>
            </div>
          </caption>
          <thead className="bg-emerald-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-center">ID</th>
              <th className="px-6 py-3 text-left font-medium text-center">Name</th>
              <th className="px-6 py-3 text-left font-medium text-center">Description</th>
              <th className="px-6 py-3 text-left font-medium text-center">Discount (%)</th>
              <th className="px-6 py-3 text-left font-medium text-center">Up-to-date</th>
              <th className="px-6 py-3 text-left font-medium text-center">Status</th>
              <th className="px-6 py-3 text-left font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((voucher) => (
              <tr key={voucher.id} className="border-b">
                <td className="px-6 py-4 text-center text-sm">{voucher.id}</td>
                <td className="px-6 py-4 text-center text-sm">{voucher.name}</td>
                <td className="px-6 py-4 text-center text-sm">{voucher.description}</td>
                <td className="px-6 py-4 text-center text-sm">{voucher.discount}</td>
                <td className="px-6 py-4 text-center text-sm">{voucher.upToDate}</td>
                <td className="px-6 py-4 text-center text-sm">
                  <select
                    value={voucher.status}
                    onChange={(e) => handleStatusChange(voucher.id, e.target.value)}
                    className={`rounded px-2 py-1 text-sm 
      focus:bg-white focus:text-black ${voucher.status === 'Complete' ? 'bg-emerald-200 text-black' : 'bg-gray-300 text-black'
                      }`}
                    onBlur={(e) => {
                      e.target.classList.remove('bg-white', 'text-black');
                      e.target.classList.add(
                        voucher.status === 'Complete' ? 'bg-emerald-200 text-black' : 'bg-gray-300 text-black'
                      );
                    }}
                  >
                    <option value="Complete" className="text-center">Complete</option>
                    <option value="Incomplete" className="text-center">Incomplete</option>
                  </select>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex space-x-4 justify-center">
                    <button className="hover:text-blue-500">
                      <FaEye size={20} />
                    </button>
                    <button className="hover:text-blue-500">
                      <FaPen size={20} />
                    </button>
                    <button className="hover:text-blue-500">
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
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'flex space-x-2'}
          previousClassName={`px-3 py-1 rounded-lg ${currentPage === 0 ? 'cursor-not-allowed text-gray-100' : 'bg-white hover:bg-white'}`}
          nextClassName={`px-3 py-1 rounded-lg ${currentPage === pageCount - 1 ? 'cursor-not-allowed text-gray-100' : 'bg-white hover:bg-white'}`}
          activeClassName={'px-3 py-1 bg-gray-300 text-black rounded'}
          pageClassName={'px-3 py-1 rounded text-neutral-400 font-bold'}
          disabledClassName={'cursor-not-allowed'}
        />
      </div>
    </div>
  );
};

export default VoucherList;