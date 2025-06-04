import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Substituir "localhost" pelo endereço IP da máquina que está executando a API
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
