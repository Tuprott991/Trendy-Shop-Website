import React from "react";
import DashboardHeader from "../../components/retailer/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/retailer/DashboardView/SummaryStatistics";
import ManageProducts from "../../components/retailer/DashboardView/ManageProducts";

const RetailerDashboard = () => {
    return (
        <div className="">
            <DashboardHeader />
            <SummaryStatistics />
            <ManageProducts />
        </div>
    );
};

export default RetailerDashboard;
