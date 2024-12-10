import React from "react";
import DashboardHeader from "../../components/admin/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/admin/DashboardView/SummaryStatistics";
import ManageRetailers from "../../components/admin/DashboardView/ManageRetailers";

const AdminDashboard = () => {    
    return (
        <div className="">
            <DashboardHeader />
            <SummaryStatistics />
            <ManageRetailers />
        </div>
    );
};

export default AdminDashboard;
