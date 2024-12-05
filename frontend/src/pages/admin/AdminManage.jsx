import React from "react";
import RetailerHeader from '../../components/admin/ManageRetailerView/RetailerHeader';
import RetailersList from '../../components/admin/ManageRetailerView/RetailersList';

const AdminManage = () => {
    return (
        <div className="">
            <RetailerHeader />
            <RetailersList />
        </div>
    );
};

export default AdminManage;
