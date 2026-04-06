'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useAuth} from "@/app/context/AuthContext";
import {AppRole, SIDEBAR_MENU} from "@/app/config/Navigation";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden">

            {/* 🌑 OVERLAY MÓVIL: Cristal oscuro que aparece al abrir el menú en celular */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* 🌑 SIDEBAR: Oculto en móvil por defecto, fijo en escritorio */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950/90 backdrop-blur-xl border-r border-zinc-900 flex flex-col p-6 h-screen 
        transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-100 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <span className="text-zinc-950 font-black text-xs">C</span>
                        </div>
                        <span className="font-bold tracking-tighter text-lg">OPERATIONS</span>
                    </div>
                    {/* Botón para cerrar en móvil */}
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-500 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <nav className="flex-1 space-y-2 mt-6">
                    {SIDEBAR_MENU.map((item) => {
                        // El filtro mágico: ¿El rol del usuario está en la lista de permitidos?
                        const canSee = user && item.allowedRoles.includes(user.role as AppRole);

                        if (!canSee) return null; // Si no tiene permiso, la opción ni siquiera se dibuja

                        return (
                            <Link id={`side-link-${item.name}`} href={`${item.path}`} key={item.name} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 transition-all uppercase tracking-widest text-[10px] group">
                                <span className="text-sm opacity-50 group-hover:opacity-100">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Info del Usuario */}
                <div className="pt-6 border-t border-zinc-900">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-1">{user?.role}</p>
                    <p className="text-xs font-medium truncate mb-4">{user?.name}</p>
                    <button
                        onClick={logout}
                        className="w-full py-2 rounded-md border border-red-900/30 text-[10px] text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all uppercase font-bold tracking-widest"
                    >
                        Finalizar Sesión
                    </button>
                </div>
            </aside>

            {/* 🚀 ÁREA DE CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

                {/* Header Superior del Dashboard */}
                <header className="h-16 md:h-20 border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-zinc-950/80 backdrop-blur-md z-30 shrink-0">

                    <div className="flex items-center gap-4">
                        {/* Botón de Hamburguesa (Solo Móvil) */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h2 className="text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 uppercase truncate">
                            SISTEMA ACTIVO <span className="hidden sm:inline">// {user?.plan} PLAN</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] text-zinc-600 font-bold uppercase">ID Negocio</p>
                            <p className="text-[10px] text-zinc-400 font-mono">{user?.businessId?.slice(0, 8)}...</p>
                        </div>
                        {/* Indicador de estado para celular */}
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse sm:hidden shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </header>

                {/* El contenido dinámico (Scrollable independientemente) */}
                <section className="p-4 md:p-8 flex-1 overflow-y-auto">
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