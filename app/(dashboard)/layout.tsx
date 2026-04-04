'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {useAuth} from "@/app/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">

            {/* 🌑 SIDEBAR: El panel de control izquierdo */}
            <aside className="w-64 border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-xl flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-zinc-100 rounded-sm flex items-center justify-center">
                        <span className="text-zinc-950 font-black text-xs">C</span>
                    </div>
                    <span className="font-bold tracking-tighter text-lg">OPERATIONS</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {['Overview', 'Inventario', 'Ventas', 'Rentas', 'Clientes'].map((item) => (
                        <button key={item} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 transition-all uppercase tracking-widest text-[10px]">
                            {item}
                        </button>
                    ))}
                </nav>

                {/* Info del Usuario al final del Sidebar */}
                <div className="pt-6 border-t border-zinc-900">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-1">{user?.role}</p>
                    <p className="text-xs font-medium truncate mb-4">{user?.name}</p>
                    <button
                        onClick={logout}
                        className="text-[10px] text-red-500/70 hover:text-red-500 transition-colors uppercase font-bold tracking-widest"
                    >
                        Finalizar Sesión
                    </button>
                </div>
            </aside>

            {/* 🚀 ÁREA DE CONTENIDO PRINCIPAL */}
            <main className="flex-1 relative flex flex-col">
                {/* Header Superior del Dashboard */}
                <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-8 bg-zinc-950/20 backdrop-blur-sm">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase">
                        SISTEMA ACTIVO // {user?.plan} PLAN
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] text-zinc-600 font-bold uppercase">ID Negocio</p>
                            <p className="text-[10px] text-zinc-400 font-mono">{user?.businessId.slice(0, 8)}...</p>
                        </div>
                    </div>
                </header>

                {/* El contenido dinámico de cada página */}
                <section className="p-8 flex-1 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </section>
            </main>

        </div>
    );
}