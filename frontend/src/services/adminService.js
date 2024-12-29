import axios from "axios";

const getAdminDashboard = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/admindashboard`);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const getDashboardRetailer = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/getretailerslist`);
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

const deleteRetailer = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/user/deleteuser`, { id });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

export const adminService = {
    getAdminDashboard,
    getManageRetailer,
    deleteRetailer,
    getDashboardRetailer
};