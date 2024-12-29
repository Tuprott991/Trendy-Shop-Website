import React from "react";

export default function DashboardHeader() {
  return (
    <div className="border-gray-300 flex items-center justify-between p-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Hi, welcome back to SoftWear!</p>
        </div>
      </div>
    </div>
  );
}
