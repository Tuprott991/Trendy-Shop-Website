import axios from "axios";

const getUserProfile = async (token) => {
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

const updateUserProfile = async (token, data) => {
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

export const userService = {
    getUserProfile,
    updateUserProfile,
};