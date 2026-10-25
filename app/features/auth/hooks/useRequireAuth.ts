'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { clearSession } from '../utils/session';

/**
 * Guard de cliente para zonas privadas.
 * Devuelve true solo cuando la sesión ya se restauró y es válida.
 * (El middleware cubre la navegación; esto cubre sesiones que mueren con la pestaña abierta.)
 */
export function useRequireAuth(): boolean {
    const router = useRouter();
    const { isReady, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isReady && !isAuthenticated) {
            clearSession(); // sin esto, el middleware vería un token suelto y nos devolvería aquí
            router.replace('/login');
        }
    }, [isReady, isAuthenticated, router]);

    return isReady && isAuthenticated;
}