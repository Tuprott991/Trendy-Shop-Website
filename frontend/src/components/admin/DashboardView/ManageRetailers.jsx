import React, { useState, useEffect } from "react";
import Pagination from "../Helper/pagination.jsx";
import { adminService } from "../../../services/adminService";
import CircularProgress from '@mui/material/CircularProgress';

const RetailersList = () => {
    const [retailers, setRetailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRetailers = async () => {
            try {
                const response = await adminService.getDashboardRetailer();
                const data = response.data;
                setRetailers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRetailers();
    }, []);

    if (loading) {
        return (<div className="loading-container 
            flex justify-center 
            items-center 
            space-x-2">
            <CircularProgress />
            <p>Loading...</p>
        </div>);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const renderItems = (retailers) => (
        <div className="overflow-hidden rounded-2xl shadow-lg">
            <table className="min-w-full bg-white">
                <caption className="text-lg font-semibold py-3 bg-white">
                    <div className="flex justify-begin items-center px-6">
                        <p className="text-lg font-bold">List Retailers</p>
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
                            <td className="px-6 py-4 text-center">{retailer.totalOrders}</td>
                            <td className="px-6 py-4 text-center">{retailer.deliveredOrders}</td>
                            <td className="px-6 py-4 text-center">${retailer.revenue.toFixed(0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="p-4">
            <Pagination data={retailers} itemsPerPage={5} renderItems={renderItems} />
        </div>
    );
};

export default RetailersList;
