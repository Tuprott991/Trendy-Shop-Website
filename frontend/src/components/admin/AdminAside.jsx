import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgHome, CgCopy, CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { BsPatchExclamation } from "react-icons/bs";
import { DropdownContext } from "../../context/DropDownContext";
import { AuthContext } from "../../context/AuthContext";

const RetailerAside = () => {
    const navigate = useNavigate();
    const { isOpen, setIsOpen } = useContext(DropdownContext);
    const { isLoginSuccess, logout, setIsLoginSuccess } = useContext(AuthContext);

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const divRef = useRef(null);

    useEffect(() => {
        if (isLoginSuccess) {
            const timer = setTimeout(() => setIsLoginSuccess(false), 3500);
            return () => clearTimeout(timer);
        }
    }, [isLoginSuccess, setIsLoginSuccess]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    const handleLogout = () => {
        logout();
        setShowLogoutModal(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <>
            {isLoginSuccess && (
                <div
                    className="absolute z-50 right-6 top-16 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div>
                        <span className="font-medium">Successfully login!</span>
                    </div>
                </div>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"
                    onClick={() => setIsOpen((prev) => !prev)}
                ></div>
            )}

            <div className="h-screen w-64 bg-white flex flex-col justify-between" ref={divRef}>
                {/* Title */}
                <div className="px-6 py-4 mb-10">
                    <h1 className="text-2xl font-bold text-green-600 cursor-pointer hover:opacity-90">
                        SoftWear
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">Admin Dashboard</p>
                </div>

                <div className="flex-1 flex flex-col px-6 py-4 space-y-4">
                    <div
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                        onClick={() => handleNavigation("/admin")}
                    >
                        <CgHome size={24} />
                        <span className="text-sm font-semibold">Dashboard</span>
                    </div>

                    {/* Manage Retailers */}
                    <div
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                        onClick={() => handleNavigation("/admin/manage")}
                    >
                        <CgCopy size={24} />
                        <span className="text-sm font-semibold">Manage Retailer</span>
                    </div>

                    {/* Profile */}
                    <div
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                        onClick={() => handleNavigation("/admin/profile")}
                    >
                        <CgProfile size={24} />
                        <span className="text-sm font-semibold">Profile</span>
                    </div>

                    {/* Logout */}
                    <div
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-100 text-gray-700 transition-all"
                        onClick={() => setShowLogoutModal(true)}
                    >
                        <IoLogOutOutline size={24} color="red" />
                        <span className="text-sm font-semibold text-red-500">Logout</span>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <div className="flex justify-center items-center mb-4">
                            <BsPatchExclamation size={150} color="red" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">Are you sure?</h2>
                        <p className="text-gray-600 mt-2 mb-2 text-center">You will be returned to the login screen.</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-bold"
                                onClick={handleCancelLogout}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RetailerAside;
