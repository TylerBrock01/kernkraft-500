'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useRequireAuth } from '@/app/features/auth/hooks/useRequireAuth';
import { SIDEBAR_MENU } from '@/app/config/Navigation';
import DashboardHeader from '@/components/layout/DashboardHeader';
import Sidebar from '@/components/layout/SideBar';

function ShellSkeleton() {
    return (
        <div className="flex h-dvh w-full items-center justify-center bg-zinc-950">
      <span
          role="status"
          aria-label="Cargando sesión"
          className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-100"
      />
        </div>
    );
}

export function DashboardShell({ children }: { children: ReactNode }) {
    const isAllowed = useRequireAuth();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // En móvil, al navegar se cierra el menú
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    if (!isAllowed) return <ShellSkeleton />;

    return (
        <div className="flex h-dvh w-full overflow-hidden bg-zinc-950 text-zinc-100">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                user={user}
                logout={logout}
                menuItems={SIDEBAR_MENU}
            />

            <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
                <DashboardHeader user={user} onOpenSidebar={() => setIsSidebarOpen(true)} />

                {/* overscroll-contain: el rebote de iOS queda dentro de esta sección y no mueve el header.
            pb-12: el último elemento no queda tapado por el Home Indicator. */}
                <main className="flex-1 overflow-y-auto overscroll-contain px-4 pb-12 scrollbar-hide lg:p-8 lg:pb-8">
                    {children}
                </main>
            </div>
        </div>
    );
}