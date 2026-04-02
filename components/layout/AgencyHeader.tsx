import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function AgencyHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo de la Agencia */}
                <Link href="/public" className="flex items-center gap-2 group">
                    <Terminal className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                    <span className="font-medium tracking-widest text-zinc-200 group-hover:text-white transition-colors">
            CAZA
          </span>
                </Link>

                {/* Navegación Principal */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-light text-zinc-400">
                    <Link href="#features" className="hover:text-zinc-200 transition-colors">Características</Link>
                    <Link href="/pricing" className="hover:text-zinc-200 transition-colors">Planes</Link>
                    <Link href="#contact" className="hover:text-zinc-200 transition-colors">Contacto</Link>
                </nav>

                {/* Botón de Acceso (Demo temporal) */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/demo-tenant/admin/login"
                        className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                        Acceso Clientes
                    </Link>
                </div>

            </div>
        </header>
    );
}