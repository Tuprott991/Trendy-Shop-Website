import React, { useState, useEffect, useRef } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownOpen && !startDate && !endDate) {
      const today = new Date();
      setStartDate(today);
      setEndDate(today);
    }
  }, [dropdownOpen]);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formattedDateRange = startDate && endDate
    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    : "Select a date range";

  return (
    <div className="border-gray-300 flex items-center justify-between p-4">
      {/* Main Header */}
      <div className="flex justify-between items-center w-full">
        {/* Left Section */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Hi, welcome back to SoftWear!</p>
        </div>
      </div>

      {/* Filter Period Container */}
      <div className="bg-white p-3 shadow-md rounded-lg max-w-6xl relative" ref={dropdownRef}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Left Section (Button) */}
          <div className="flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-white border border-gray-300 p-2 text-sm rounded-lg hover:bg-gray-50 focus:outline-none transition ease-in-out duration-200"
              aria-label="Open date range filter"
            >
              <FaRegCalendarAlt size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Right Section (Text for Date Range) */}
          <div className="flex flex-col items-start ml-2 flex-grow w-[150px]">
            <p className="text-sm font-semibold text-gray-900">Filter by Date</p>
            <p className="text-xs text-gray-600 mt-1">{formattedDateRange}</p>
          </div>
        </div>

        {/* Dropdown for DatePicker */}
        {dropdownOpen && (
          <div
            className="absolute top-[65px] left-[85px] transform translate-x-[-50%] bg-white border border-gray-300 rounded-lg shadow-lg z-10 transition ease-in-out duration-300 p-4"
          >
            <p className="text-xs text-black mb-2">
              Select date range
            </p>
            <DatePicker
              selected={startDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}