import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 10000,
});


axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
