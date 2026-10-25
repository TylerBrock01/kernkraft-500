import Cookies from 'js-cookie';
import type { AuthUser } from '../types';

const TOKEN_KEY = 'caza_token';
const USER_KEY = 'caza_user';

const COOKIE_OPTIONS = {
    expires: 1,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
};

interface Session {
    token: string;
    user: AuthUser;
}

export function saveSession({ token, user }: Session): void {
    Cookies.set(TOKEN_KEY, token, COOKIE_OPTIONS);
    Cookies.set(USER_KEY, JSON.stringify(user), COOKIE_OPTIONS);
}

export function clearSession(): void {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
}

export function readSession(): Session | null {
    const token = Cookies.get(TOKEN_KEY);
    const rawUser = Cookies.get(USER_KEY);

    if (!token || !rawUser) return null;

    try {
        const user = JSON.parse(rawUser) as AuthUser;
        // Validación mínima: cubre el caso de la cookie corrupta ("undefined", "null", etc.)
        if (!user || typeof user.email !== 'string') throw new Error('Invalid user');
        return { token, user };
    } catch {
        clearSession(); // cookie corrupta: limpiamos
        return null;
    }
}

export function getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY);
}