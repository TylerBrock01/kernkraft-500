import axios from 'axios';
import Cookies from 'js-cookie';

// Apuntamos al motor de NestJS
// const API_URL = 'http://localhost:3000';
const API_URL = process.env.API_URL;

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Antes de que cualquier petición salga, le pegamos el JWT
api.interceptors.request.use((config:any) => {
    const token = Cookies.get('caza_token'); // Buscamos la cookie
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});