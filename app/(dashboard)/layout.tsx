'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@/app/context/AuthContext";
import { SIDEBAR_MENU } from "@/app/config/Navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Sidebar from "@/components/layout/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname(); // 👈 Obtenemos la ruta actual

    return (
        <div className="bg-zinc-950 text-zinc-100 flex overflow-hidden lg:h-screen w-full">

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                user={user}
                logout={logout}
                menuItems={SIDEBAR_MENU}
            />

            <main className="flex-1 flex flex-col min-w-0 h-[100dvh] overflow-hidden relative bg-zinc-950">

                {/*<DashboardHeader*/}
                {/*    user={user}*/}
                {/*    onOpenSidebar={() => setIsSidebarOpen(true)}*/}
                {/*/>*/}

                {/* Contenedor scrolleable protegido para iOS */}
                <section className="px-4 flex-1 overflow-y-auto overscroll-contain pb-12 lg:pb-8 scrollbar-hide relative">
                    {/* AnimatePresence mode="popLayout" previene saltos en el scroll
                        durante las transiciones de rutas.
                    */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            // 🛡️ FIX ARCHITECTURE: La key fuerza el re-render de la animación al cambiar de ruta
                            key={pathname}
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className="min-h-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </section>

            </main>
        </div>
    );
}