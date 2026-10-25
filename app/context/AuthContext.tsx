'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import type { AuthUser } from '@/app/features/auth/types';
import { clearSession, readSession, saveSession } from '@/app/features/auth/utils/session';

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isReady: boolean; // true cuando ya se intentó restaurar la sesión
    login: (token: string, userData: AuthUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isReady, setIsReady] = useState(false);

    // Restaurar sesión (en useEffect para evitar hydration mismatch con SSR)
    useEffect(() => {
        setUser(readSession()?.user ?? null);
        setIsReady(true);
    }, []);

    const login = useCallback((token: string, userData: AuthUser) => {
        if (!token || !userData) {
            throw new Error('El servidor no devolvió credenciales válidas.');
        }
        saveSession({ token, user: userData });
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        clearSession();
        setUser(null);
        window.location.href = '/login'; // recarga completa: resetea todo el estado en memoria
    }, []);

    const value = useMemo(
        () => ({ user, isAuthenticated: !!user, isReady, login, logout }),
        [user, isReady, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
};