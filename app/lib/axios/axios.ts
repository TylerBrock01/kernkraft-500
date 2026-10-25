import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { clearSession, getToken } from '@/app/features/auth/utils/session';

// ---------- Configuración ----------
const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000');

if (!API_URL) {
    // Falla en el build en vez de apuntar a una URL equivocada en producción
    throw new Error('Falta la variable NEXT_PUBLIC_API_URL');
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