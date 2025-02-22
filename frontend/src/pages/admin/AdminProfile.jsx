import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/partials/ProfileHeader";
import ProfileMain from "../../components/partials/ProfileMain";
import { userService } from "../../services/userService";

const AdminProfile = () => {
    const token = localStorage.getItem("token");
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await userService.getUserProfile(token);
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
