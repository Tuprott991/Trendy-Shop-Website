import { Outlet } from "react-router-dom";
import RetailerAside from "../../components/retailer/RetailerAside";

const RetailerLayout = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <aside style={{ flex: '1', padding: '10px' }}>
                    <RetailerAside>Aside</RetailerAside>
                </aside>
                <main className="bg-gray-100" style={{ flex: '4', padding: '10px' }}>
                    <Outlet />
                </main>
            </div>
            <footer>
                <div className="px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">© 2024 SoftWear</p>
                </div>
            </footer>
        </>
    );
};

export default RetailerLayout;
