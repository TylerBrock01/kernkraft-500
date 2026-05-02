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

// Interceptor: Antes de que cualquier petición salga, le pegamos el JWT y la Zona Horaria
api.interceptors.request.use((config: any) => {
    // 1. Inyección de Seguridad (JWT)
    const token = Cookies.get('caza_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. 🌎 NUEVO: Inyección de Coordenadas de Tiempo (Timezone)
    // Extrae automáticamente "America/Tijuana" (o donde esté el cliente)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimezone) {
        config.headers['x-timezone'] = userTimezone;
    }

    return config;
});
// 🚀 INSTANCIA PÚBLICA (Para clientes finales, sin tokens ni interceptores)
export const publicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.0.2:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});
