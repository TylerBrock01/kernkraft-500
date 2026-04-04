'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {useRouter} from "next/navigation";
import {useAuth} from "@/app/context/AuthContext";
import {api} from "@/app/lib/axios/axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Para mostrar alertas rojas

    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Limpiamos errores previos

        try {
            // Disparamos al puerto 3000
            const response = await api.post('/auth/login', { email, password });

            // Extraemos lo que nos mandó NestJS
            const { access_token, user } = response.data;

            // Guardamos en nuestro Estado Global y Cookies
            login(access_token, user);

            // Redirigimos al panel de control protegido
            router.push('/pos');

        } catch (err: any) {
            // Si NestJS nos manda un 401, lo atrapamos aquí
            setError(err.response?.data?.message || 'Error en las credenciales. Acceso denegado.');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center relative overflow-hidden px-4">

            {/* 🔮 Iluminación táctica de fondo */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-zinc-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Panel de Cristal */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

                    {/* Logo y Encabezado */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-12 h-12 bg-zinc-100 rounded-sm flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="text-zinc-950 font-black text-xl">C</span>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Acceso al Motor</h2>
                        <p className="text-zinc-500 text-sm mt-2">Autenticación requerida para operar</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                                Credencial Operativa (Email)
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-700"
                                placeholder="admin@tuempresa.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                    Código de Seguridad (Password)
                                </label>
                                <a href="#" className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors">
                                    ¿Extravió su acceso?
                                </a>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-700"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg mt-8 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
                        >
                            Iniciar Secuencia
                        </button>
                    </form>

                </div>

                {/* Retorno de seguridad */}
                <div className="mt-8 text-center">
                    <a href="/" className="text-xs text-zinc-600 hover:text-zinc-400 flex items-center justify-center gap-2 transition-colors">
                        <span className="rotate-180">➜</span> Abortar y volver a la terminal pública
                    </a>
                </div>

            </motion.div>
        </div>
    );
}