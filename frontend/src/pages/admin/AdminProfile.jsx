import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/admin/ProfileView/ProfileHeader";
import ProfileMain from "../../components/admin/ProfileView/ProfileMain";
import { adminService } from "../../services/adminService";

const AdminProfile = () => {
    const token = localStorage.getItem("token");
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await adminService.getAdminProfile(token);
                setAdminData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (token) {
            fetchAdminProfile();
        } else {
            setError("No token found");
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="">
            <ProfileHeader adminData={adminData} />
            <ProfileMain adminData={adminData} />
        </div>
    );
};

export default AdminProfile;
