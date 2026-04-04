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

    // Al recargar la página, verificamos si hay sesión guardada
    useEffect(() => {
        const token = Cookies.get('caza_token');
        const savedUser = Cookies.get('caza_user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Función para iniciar sesión
    const login = (token: string, userData: User) => {
        // Guardamos el token de forma segura en las cookies (caduca en 1 día)
        Cookies.set('caza_token', token, { expires: 1, secure: true, sameSite: 'strict' });
        // Guardamos los datos del usuario para acceso rápido
        Cookies.set('caza_user', JSON.stringify(userData), { expires: 1, secure: true, sameSite: 'strict' });

        setUser(userData);
    };

    // Función para destruir la sesión
    const logout = () => {
        Cookies.remove('caza_token');
        Cookies.remove('caza_user');
        setUser(null);
        window.location.href = '/login'; // Expulsamos al usuario
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