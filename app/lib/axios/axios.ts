import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { clearSession, getToken } from '@/app/features/auth/utils/session';

// ---------- Configuración ----------
// ---------- Configuración ----------
const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
    // Aviso visible en logs, pero sin tumbar el build
    console.error('⚠️ Falta NEXT_PUBLIC_API_URL: la app apuntará a localhost');
}

const LOGIN_PATH = '/login';
const LOGIN_ENDPOINT = '/auth/login';

// El timezone no cambia durante la sesión: lo calculamos una sola vez
let cachedTimezone: string | undefined;
const getTimezone = () =>
    (cachedTimezone ??= Intl.DateTimeFormat().resolvedOptions().timeZone);

const baseConfig = {
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
};

// ---------- API autenticada ----------
export const api = axios.create({
    ...baseConfig,
    // Paciencia para el cold start de Render (plan gratuito)
    timeout: 60_000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const timezone = getTimezone();
    if (timezone) config.headers['x-timezone'] = timezone;

    return config;
});

let isRedirectingToLogin = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isUnauthorized = isAxiosError(error) && error.response?.status === 401;
        const isLoginCall = error.config?.url?.includes(LOGIN_ENDPOINT);

        // Solo en el navegador, y nunca en el propio login (ahí un 401 es "credenciales incorrectas")
        if (typeof window !== 'undefined' && isUnauthorized && !isLoginCall) {
            const { pathname, search } = window.location;

            if (pathname !== LOGIN_PATH && !isRedirectingToLogin) {
                isRedirectingToLogin = true; // varias peticiones en vuelo darían varios 401
                clearSession(); // 🔑 sin esto, el middleware nos regresa al dashboard: bucle
                window.location.replace(
                    `${LOGIN_PATH}?next=${encodeURIComponent(pathname + search)}`,
                );
            }
        }

        return Promise.reject(error);
    },
);

// ---------- API pública (clientes finales, sin token) ----------
export const publicApi = axios.create({
    ...baseConfig,
    timeout: 60_000,
});