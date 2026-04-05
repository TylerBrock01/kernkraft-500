'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Definimos la estructura exacta que nos escupió tu Postman
interface User {
    email: string;
    name: string;
    role: string;
    businessId: string;
    plan: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // 🛡️ 1. LECTURA DEFENSIVA
    useEffect(() => {
        const token = Cookies.get('caza_token');
        const savedUser = Cookies.get('caza_user');

        // Verificamos que exista y que NO sea la palabra maldita
        if (token && savedUser && savedUser !== 'undefined') {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Detectamos una cookie corrupta. Limpiando zona...');
                Cookies.remove('caza_token');
                Cookies.remove('caza_user');
            }
        } else if (savedUser === 'undefined') {
            // Si estaba corrupto, lo borramos silenciosamente
            Cookies.remove('caza_user');
        }
    }, []);

    // 🛡️ 2. ESCRITURA DEFENSIVA
    const login = (token: string, userData: User) => {
        // Evitamos que un error del backend nos envenene las cookies
        if (!userData) {
            console.error('Alerta: El backend no envió los datos del usuario.');
            return;
        }

        Cookies.set('caza_token', token, { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('caza_user', JSON.stringify(userData), { expires: 1, secure: true, sameSite: 'strict' });

        setUser(userData);
    };

    const logout = () => {
        Cookies.remove('caza_token');
        Cookies.remove('caza_user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar la autenticación rápido en cualquier archivo
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
};