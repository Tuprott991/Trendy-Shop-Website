import axios from "axios";

const getAdminProfile = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/getprofile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log(e.response);
        return e.response || { error: 'An error occurred while fetching profile.' };
    }
};

const updateAdminProfile = async (token, data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/user/updateprofile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e.response);
        return e.response || { error: 'An error occurred while updating profile.' };
    }
};

const getAdminDashboard = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/admindashboard`);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const getManageRetailer = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/manageretailer`);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

export const adminService = {
    getAdminProfile,
    updateAdminProfile,
    getAdminDashboard,
    getManageRetailer,
};