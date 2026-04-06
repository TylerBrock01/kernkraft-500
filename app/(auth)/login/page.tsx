'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/app/lib/axios/axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // 🚀 Ahora sí lo vamos a usar

    // 🚀 NUEVOS ESTADOS TÁCTICOS
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Limpiamos errores anteriores
        setIsLoading(true); // 🚀 Bloqueamos el formulario

        try {
            const response = await api.post('/auth/login', { email, password });

            const elToken = response.data.token || response.data.access_token;
            const elUsuario = response.data.user || response.data.userData || response.data;

            if (!elToken) {
                setError("El servidor no devolvió credenciales válidas.");
                setIsLoading(false);
                return;
            }

            // 1. Guardamos la sesión
            login(elToken, elUsuario);

            // 2. Redirigimos (No ponemos isLoading en false para que el botón siga diciendo "Redirigiendo..." durante el salto)
            router.push('/dashboard');

        } catch (error: any) {
            console.error("Error de credenciales", error);
            // 🚀 Atrapamos el error real del backend o mostramos uno genérico
            setError(error.response?.data?.message || 'Acceso denegado. Verifica tus credenciales.');
            setIsLoading(false); // Desbloqueamos para que lo intente de nuevo
        }
    }

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
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-zinc-100 rounded-sm flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="text-zinc-950 font-black text-xl">C</span>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Acceso al Motor</h2>
                        <p className="text-zinc-500 text-sm mt-2">Autenticación requerida para operar</p>
                    </div>

                    {/* 🚀 RADAR DE ANOMALÍAS (Manejo de Errores) */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-3 bg-red-950/50 border border-red-900/50 rounded-lg flex items-start gap-3"
                            >
                                <span className="text-red-500 text-sm mt-0.5">⚠</span>
                                <p className="text-red-400 text-xs font-mono leading-relaxed">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                                Credencial Operativa (Email)
                            </label>
                            <input
                                id={'login-email-input'}
                                type="email"
                                required
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700 disabled:opacity-50"
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

                            {/* 🚀 VISOR ÓPTICO Y WRAPPER RELATIVO */}
                            <div className="relative">
                                <input
                                    id={'login-password-input'}
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={isLoading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700 disabled:opacity-50 font-mono"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            id={'login-submit-button'}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg mt-8 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                                    Autorizando...
                                </>
                            ) : (
                                'Iniciar Secuencia'
                            )}
                        </button>
                    </form>

                </div>

                {/* Retorno de seguridad */}
                <div className="mt-8 text-center">
                    <a href="/" className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 hover:text-zinc-400 flex items-center justify-center gap-2 transition-colors">
                        <span className="rotate-180">➜</span> Abortar y volver a la terminal pública
                    </a>
                </div>

            </motion.div>
        </div>
    );
}