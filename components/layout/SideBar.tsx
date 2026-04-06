import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    logout: () => void;
    menuItems: any[]; // Pasa tu SIDEBAR_MENU por aquí
}

export default function Sidebar({ isOpen, onClose, user, logout, menuItems }: SidebarProps) {
    return (
        <>
            {/* 🌑 OVERLAY MÓVIL: Cristal oscuro (Oculto en PC 'lg:hidden') */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* 🌑 SIDEBAR COMPONENTE */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-900 flex flex-col p-6 h-screen
                transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-100 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <span className="text-zinc-950 font-black text-xs">C</span>
                        </div>
                        <span className="font-bold tracking-tighter text-lg">OPERATIONS</span>
                    </div>
                    {/* 📱 Botón para cerrar en móvil */}
                    <button onClick={onClose} className="lg:hidden text-zinc-500 hover:text-white p-1">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const canSee = user && item.allowedRoles.includes(user.role);
                        if (!canSee) return null;

                        return (
                            <Link href={item.path} key={item.name} onClick={() => window.innerWidth < 1024 && onClose()} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 transition-all uppercase tracking-widest text-[10px] group">
                                <span className="text-sm opacity-50 group-hover:opacity-100">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Info del Usuario */}
                <div className="border-t border-zinc-900 pt-6 mb-4 lg:mb-0 shrink-0">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-1">{user?.role}</p>
                    <p className="text-xs font-medium truncate mb-4 text-zinc-300">{user?.name}</p>
                    <button
                        onClick={logout}
                        className="w-full py-3 rounded-md border border-red-900/30 text-[10px] text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all uppercase font-bold tracking-widest"
                    >
                        Finalizar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
}