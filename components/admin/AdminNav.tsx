// components/admin/AdminNav.tsx
import Link from 'next/link'
import Logo from '../UI/Logo'
import LogoutButton from "@/components/admin/LogOutBtn";

export default function AdminNav() {
    const linkStyles = "relative px-4 py-2 text-xs font-black uppercase italic tracking-widest transition-all duration-300 transform -skew-x-12 border border-transparent hover:border-yellow-400 hover:text-yellow-400";

    return (
        <header className="px-6 md:px-12 py-6 bg-zinc-950 border-b border-white/5 flex flex-col md:flex-row gap-6 md:justify-between items-center sticky top-0 z-50 backdrop-blur-xl">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-400 -skew-x-12">
                    <Logo className="transform skew-x-12" />
                </div>
                <span className="hidden lg:block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 border-l border-white/10 pl-4">
                    Admin_Terminal_v3.1
                </span>
            </div>

            {/* Navigation Section */}
            <div className="flex flex-wrap justify-center items-center gap-4">
                <Link
                    href={'/admin/products'}
                    className={`${linkStyles} text-zinc-400`}
                >
                    <span className="inline-block transform skew-x-12">Productos</span>
                </Link>

                <Link
                    href={'/admin/sales'}
                    className={`${linkStyles} text-zinc-400`}
                >
                    <span className="inline-block transform skew-x-12">Ventas</span>
                </Link>

                {/* Botón de Retorno a Tienda con Estética Industrial */}
                <Link
                    id={'store'}
                    href={'/home'}
                    className="relative px-8 py-2 bg-white text-black font-black italic uppercase text-xs -skew-x-12 hover:bg-yellow-400 transition-colors duration-300 shadow-[4px_4px_0px_#444] active:translate-y-1 active:shadow-none"
                >
                    <span className="inline-block transform skew-x-12">Ir a Tienda</span>
                </Link>

                <div className="ml-4 pl-4 border-l border-white/10">
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}