import axios from 'axios';

export const baseURL = 'http://localhost:5001/laceup-a612e/us-central1/app';

export const validateUserJWTToken = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/auth/jwtVerification`, {
            headers: { Authorization: "Bearer " + token},
        });

        return response.data;
    } catch (err) {
        return null;
    }
}