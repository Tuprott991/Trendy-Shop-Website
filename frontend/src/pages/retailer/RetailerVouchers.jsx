import React from "react";
import ManageVouchers from "../../components/retailer/VoucherView/ManageVouchers";
import VoucherHeader from "../../components/retailer/VoucherView/VoucherHeader";

const RetailerVoucher = () => {
    return (
        <div className="">
            <VoucherHeader />
            <ManageVouchers />
        </div>
    );
};

export default RetailerVoucher;
