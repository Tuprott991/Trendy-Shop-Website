import React from "react";
import ManageOrders from "../../components/retailer/OrderView/ManageOrders";
import OrderHeader from "../../components/retailer/OrderView/OrderHeader";

const RetailerOrder = () => {
    return (
        <div className="">
            <OrderHeader />
            <ManageOrders />
        </div>
    );
};

export default RetailerOrder;
