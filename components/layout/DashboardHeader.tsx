import React from 'react';

interface DashboardHeaderProps {
    user: any;
    onOpenSidebar: () => void;
}

export default function DashboardHeader({ user, onOpenSidebar }: DashboardHeaderProps) {
    return (
        <header className=" border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-zinc-950/80 backdrop-blur-md z-30 shrink-0">
            <div className="flex items-center gap-4">
                {/* 📱 Botón de Hamburguesa (Visible en Móvil y Tablet, oculto en PC 'lg:hidden') */}
                <button
                    onClick={onOpenSidebar}
                    className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h2 className="text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 uppercase truncate">
                    SISTEMA ACTIVO <span className="hidden sm:inline">// {user?.plan || 'LITE'} PLAN</span>
                </h2>
            </div>

            <div className="flex items-center gap-4">
                {/* 💻 Info de negocio (Oculta en móviles muy pequeños, visible en Tablet/PC 'sm:block') */}
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase">ID Negocio</p>
                    <p className="text-[10px] text-zinc-400 font-mono">{user?.businessId?.slice(0, 8) || 'GLOBAL'}...</p>
                </div>
                {/* 📱 Indicador de estado para celular (Oculto en Tablet/PC 'md:hidden') */}
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse md:hidden shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
        </header>
    );
}