import axios from "axios";

const getOrders = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/order`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const getDashboard = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const addProduct = async (token, product) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/addproduct`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

export const retailerService = {
    getDashboard,
};