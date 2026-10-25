import { api } from '@/app/lib/axios/axios';
import type { LoginCredentials, LoginResult } from '../types';

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResult> {
    const { data } = await api.post('/auth/login', credentials);

    // Si tu backend aún responde con formas distintas, normalízalo SOLO aquí.
    const token = data.token ?? data.access_token;
    const user = data.user ?? data.userData;

    if (!token || !user) {
        throw new Error('El servidor no devolvió credenciales válidas.');
    }

    return { token, user };
}