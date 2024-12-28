import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/partials/ProfileHeader";
import ProfileMain from "../../components/retailer/ProfileView/ProfileMain";
import { retailerService } from "../../services/retailerService";

const RetailerProfile = () => {
    const token = localStorage.getItem("token");
    const [retailerData, setRetailerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRetailerProfile = async () => {
            try {
                const response = await retailerService.getRetailerProfile(token);
                setRetailerData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        if (token) {
            fetchRetailerProfile();
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
            <ProfileHeader retailerData={retailerData} />
            <ProfileMain retailerData={retailerData} />
        </div>
    );
};

export default RetailerProfile;
