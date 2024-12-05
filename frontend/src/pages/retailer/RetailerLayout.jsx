import { useState } from 'react';
import RetailerAside from "../../components/retailer/RetailerAside";
import DashboardHeader from "../../components/retailer/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/retailer/DashboardView/SummaryStatistics";
import ManageProducts from "../../components/retailer/DashboardView/ManageProducts";
import ManageOrders from "../../components/retailer/OrderView/ManageOrders";
import OrderHeader from "../../components/retailer/OrderView/OrderHeader";
import ManageVouchers from "../../components/retailer/VoucherView/ManageVouchers";
import VoucherHeader from "../../components/retailer/VoucherView/VoucherHeader";
import ProfileHeader from "../../components/retailer/ProfileView/ProfileHeader";
import ProfileMain from "../../components/retailer/ProfileView/ProfileMain";

const RetailerLayout = () => {
    const [selectedComponent, setSelectedComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return (
                    <>
                        <DashboardHeader />
                        <SummaryStatistics />
                        <ManageProducts />
                    </>
                );
            case 'orders':
                return (
                    <>
                        <OrderHeader />
                        <ManageOrders />
                    </>
                );
            case 'vouchers':
                return (
                    <>
                        <VoucherHeader />
                        <ManageVouchers />
                    </>
                );
            case 'profile':
                return (
                    <>
                        <ProfileHeader />
                        <ProfileMain />
                    </>
                )
            default:
                return (
                    <>
                        <DashboardHeader />
                        <SummaryStatistics />
                        <ManageProducts />
                    </>
                );
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <aside style={{ flex: '1', padding: '10px' }}>
                <RetailerAside onSelectComponent={setSelectedComponent} selectedComponent={selectedComponent} />
            </aside>
            <main className="bg-gray-100" style={{ flex: '4', padding: '10px' }}>
                {renderComponent()}
            </main>
        </div>
    );
};

export default RetailerLayout;
