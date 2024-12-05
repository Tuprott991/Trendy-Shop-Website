import { Outlet } from "react-router-dom";
import RetailerAside from "../../components/admin/AdminAside";

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <aside style={{ flex: '1', padding: '10px' }}>
                <RetailerAside />
            </aside>
            <main className="bg-gray-100" style={{ flex: '4', padding: '10px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
