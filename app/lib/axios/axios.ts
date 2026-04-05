import axios from 'axios';
import Cookies from 'js-cookie';

// 🚀 REGLA DE ORO: Las variables de frontend DEBEN empezar con NEXT_PUBLIC_
// Le ponemos el fallback a localhost para que no tengas que cambiar el código al probar en tu PC
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
    // ⚠️ Agregamos 60 segundos de paciencia para darle tiempo a Render de despertar del modo gratuito
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Antes de que cualquier petición salga, le pegamos el JWT
api.interceptors.request.use((config: any) => {
    const token = Cookies.get('caza_token'); // Buscamos la cookie
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});