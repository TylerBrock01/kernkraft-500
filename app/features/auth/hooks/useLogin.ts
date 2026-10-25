'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { loginRequest } from '../services/auth.service';
import { getErrorMessage } from '../utils/get-error-message';
import type { LoginCredentials } from '../types';

const DEFAULT_REDIRECT = '/dashboard';

// Solo rutas internas: evita open redirect (//evil.com, https://evil.com)
const getSafeRedirect = (next: string | null) =>
    next && next.startsWith('/') && !next.startsWith('//') ? next : DEFAULT_REDIRECT;

export function useLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (credentials: LoginCredentials) => {
        setError(null);
        setIsLoading(true);

        try {
            const { token, user } = await loginRequest(credentials);
            login(token, user);
            // ✅ La navegación ocurre en el handler, no durante el render
            router.replace(getSafeRedirect(searchParams.get('next')));
            // No apagamos isLoading: el botón sigue bloqueado durante la navegación
        } catch (err) {
            setError(getErrorMessage(err));
            setIsLoading(false);
        }
    };

    return { submit, error, isLoading };
}