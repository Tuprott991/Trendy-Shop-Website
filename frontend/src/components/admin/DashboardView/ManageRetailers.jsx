import React, { useState } from "react";

const RetailersList = () => {
    const [retailers] = useState([
        { name: "shop01", email: "shop01@example.com", orders: 5, delivered: 5, revenue: 128 },
        { name: "shop02", email: "shop02@example.com", orders: 5, delivered: 5, revenue: 128 },
        { name: "shop03", email: "shop03@example.com", orders: 1, delivered: 1, revenue: 128 },
        { name: "shop04", email: "shop04@example.com", orders: 5, delivered: 5, revenue: 128 },
        { name: "shop05", email: "shop05@example.com", orders: 15, delivered: 15, revenue: 128 },
    ]);

    return (
        <div className="p-4">
            <div className="overflow-hidden rounded-2xl shadow-lg">
                <table className="min-w-full bg-white">
                    <caption className="text-lg font-semibold py-3 bg-white">
                        <div className="flex justify-begin items-center px-6">
                            <p className="text-lg font-bold">List Products</p>
                        </div>
                    </caption>
                    <thead className="bg-emerald-500 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
                        <tr>
                            <th className="px-6 py-3 font-medium text-left text-lg"><strong>Name</strong></th>
                            <th className="px-6 py-3 font-medium text-center text-lg"><strong>Orders</strong></th>
                            <th className="px-6 py-3 font-medium text-center text-lg"><strong>Delivered</strong></th>
                            <th className="px-6 py-3 font-medium text-center text-lg"><strong>Revenue</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {retailers.map((retailer, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-emerald-500">{retailer.name}</div>
                                    <div className="text-sm text-gray-500">{retailer.email}</div>
                                </td>
                                <td className="px-6 py-4 text-center">{retailer.orders}</td>
                                <td className="px-6 py-4 text-center">{retailer.delivered}</td>
                                <td className="px-6 py-4 text-center">${retailer.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RetailersList;
