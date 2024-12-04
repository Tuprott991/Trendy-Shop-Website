import { useContext, useEffect, useRef } from "react";
import { CgHome, CgCopy } from "react-icons/cg";
import { RiCoupon2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { DropdownContext } from "../../context/DropDownContext";
import { AuthContext } from "../../context/AuthContext";

const RetailerAside = () => {
    const { isOpen, setIsOpen } = useContext(DropdownContext);
    const { isLoginSuccess, logout, setIsLoginSuccess } = useContext(AuthContext);
    const divRef = useRef(null);

    useEffect(() => {
        console.log(isLoginSuccess);
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
        console.log("Logging out...");
        logout();
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

            <div className="h-screen w-64 bg-white flex flex-col justify-between">
                {/* Title */}
                <div className="px-6 py-4 mb-10"> {/* Thêm lớp mb-4 ở đây */}
                    <h1 className="text-2xl font-bold text-green-600 cursor-pointer hover:opacity-90">
                        SoftWear
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">Retailer Dashboard</p>
                </div>
                {/* Buttons */}
                <div className="flex-1 flex flex-col gap-6 px-6">
                    <div className="flex items-center gap-3 cursor-pointer hover:text-green-600 transition-all">
                        <CgHome size={24} className="text-gray-700" />
                        <span className="text-gray-700 text-sm">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer hover:text-green-600 transition-all">
                        <CgCopy size={24} className="text-gray-700" />
                        <span className="text-gray-700 text-sm">Order</span>
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer hover:text-green-600 transition-all">
                        <RiCoupon2Line size={24} className="text-gray-700" />
                        <span className="text-gray-700 text-sm">Voucher</span>
                    </div>

                    {/* Logout */}
                    <div
                        className="flex items-center gap-3 cursor-pointer hover:text-green-600 transition-all"
                        onClick={handleLogout}
                    >
                        <IoLogOutOutline size={24} className="text-gray-700" />
                        <span className="text-gray-700 text-sm">Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RetailerAside;
