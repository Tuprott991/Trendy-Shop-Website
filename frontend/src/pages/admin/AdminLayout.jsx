import { useState } from 'react';
import RetailerAside from "../../components/admin/AdminAside";
import DashboardHeader from "../../components/admin/DashboardView/DashboardHeader";
import SummaryStatistics from "../../components/admin/DashboardView/SummaryStatistics";
import ManageRetailers from "../../components/admin/DashboardView/ManageRetailers";
import RetailerHeader from '../../components/admin/ManageRetailerView/RetailerHeader';
import RetailersList from '../../components/admin/DashboardView/ManageRetailers';
import ProfileHeader from "../../components/admin/ProfileView/ProfileHeader";
import ProfileMain from "../../components/admin/ProfileView/ProfileMain";

const RetailerLayout = () => {
    const [selectedComponent, setSelectedComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return (
                    <>
                        <DashboardHeader />
                        <SummaryStatistics />
                        <ManageRetailers />
                    </>
                );
            case 'manage-retailers':
                return (
                    <>
                        <RetailerHeader />
                        <RetailersList />
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
                        <ManageRetailers />
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
