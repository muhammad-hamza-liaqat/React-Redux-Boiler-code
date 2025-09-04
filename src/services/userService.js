import { axiosWithCredentials } from '../providers/AxiosProvider.jsx';

export const loginUser = async (credentials) => {
    try {
        const response = await axiosWithCredentials.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axiosWithCredentials.get('/user/profile');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logoutUser = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
};
