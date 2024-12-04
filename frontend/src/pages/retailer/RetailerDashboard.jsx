import DashboardHeader from "../../components/retailer/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/retailer/DashboardView/SummaryStatistics";
import ManageProducts from "../../components/retailer/DashboardView/ManageProducts";
import ManageOrders from "../../components/retailer/OrderView/ManageOrders";
import OrderHeader from "../../components/retailer/OrderView/OrderHeader";
import ManageVouchers from "../../components/retailer/VoucherView/ManageVouchers";
import VoucherHeader from "../../components/retailer/VoucherView/VoucherHeader";

const RetailerDashboard = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <SummaryStatistics></SummaryStatistics>
            <ManageProducts></ManageProducts>
            
            {/* <OrderHeader></OrderHeader>
            <ManageOrders></ManageOrders> */}

            {/* <VoucherHeader></VoucherHeader>
            <ManageVouchers></ManageVouchers> */}
        </div>
    );
};

export default RetailerDashboard;