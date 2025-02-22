import axios from "axios";

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

const deleteProduct = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/deleteproduct`, { id });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

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

const getVoucher = async (token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/voucher`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

const addVoucher = async (token, voucher) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/api/retailer/addvoucher`,
            voucher,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (e) {
        if (e.response) {
            console.error("Server responded with an error:", e.response.status, e.response.data);
            return e.response;
        } else if (e.request) {
            console.error("No response received from server. Check the network or server:", e.request);
        } else {
            console.error("Error in request setup:", e.message);
        }
        return { status: "error", message: e.message };
    }
};

const deleteVoucher = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/deletevoucher`, { id });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
};

const updateVoucher = async (id, voucher) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/updatevoucher`, {id, voucher});
        return response;
    } catch (e) {
        if (e.response) {
            console.error("Server responded with an error:", e.response.status, e.response.data);
            return e.response;
        } else if (e.request) {
            console.error("No response received from server. Check the network or server:", e.request);
        } else {
            console.error("Error in request setup:", e.message);
        }
        return { status: "error", message: e.message };
    }
};

const updateOrderStatus = async (id, newStatus) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/retailer/updatestatus`, { id, newStatus });
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }

}

export const retailerService = {
    getDashboard,
    deleteProduct,
    getOrders,
    updateOrderStatus,
    getVoucher,
    addVoucher,
    deleteVoucher,
    updateVoucher,
};