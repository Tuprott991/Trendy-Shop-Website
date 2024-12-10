import axios from "axios";

const getDashboard = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retailer/dashboard`);
        return response;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
}

export const retailerService = { 
    getDashboard,
};