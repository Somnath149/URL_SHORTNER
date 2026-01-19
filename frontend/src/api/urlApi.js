const API_BASE_URL = 'http://localhost:3000/api/url';
import axios from 'axios';


export const createShortUrl = async (url) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/create`,
            { url },          
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getShortUrl = async (shortUrl) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${shortUrl}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
