'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {useAuth} from "@/app/context/AuthContext";
import {SIDEBAR_MENU} from "@/app/config/Navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Sidebar from "@/components/layout/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-zinc-950 text-zinc-100 flex overflow-hidden lg:h-screen w-full">

            {/* 1. EL NAVEGADOR LATERAL */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                user={user}
                logout={logout}
                menuItems={SIDEBAR_MENU}
            />

            {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">

                {/* 3. HEADER SUPERIOR */}
                <DashboardHeader
                    user={user}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                {/* 4. CONTENIDO DINÁMICO (Scrollable) */}
                <section className="p-4 lg:p-8 flex-1 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                    >
                        {children}
                    </motion.div>
                </section>
            </main>
        </div>
    );
}