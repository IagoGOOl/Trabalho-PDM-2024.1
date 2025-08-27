import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'http://10.220.0.181:3000',
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        console.log('Token no interceptor:', token);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default api;
