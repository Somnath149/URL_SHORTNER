import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const signup = async (userData) => {
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Signup failed');
    }
};

export const signin = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        return response.data.user;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Signin failed');
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/me');
        return response.data.user;
    } catch (error) {
        return null;
    }
};

export const getUrlByUser = async () => {
    try {
        const response = await axiosInstance.get('/me/urls');
        return response.data.urls;
    } catch (error) {
        return null;
    }
};

export const logoutUser = async () => {
    try {
        await axiosInstance.post('/logout');
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return true; 
    }
};
