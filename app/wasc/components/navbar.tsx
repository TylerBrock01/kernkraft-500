'use client';

import { useState } from 'react';
import Link from 'next/link';

const logoWasc = 'https://res.cloudinary.com/tyler-brock/image/upload/v1792034299/logo_wasc_3x_lx5snu.png';
// const logoWasc = 'https://res.cloudinary.com/tyler-brock/image/upload/v1792074335/logo_yaibgo.png';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logotipo WASC */}
                    <Link href="wasc/" className="flex items-center gap-2 group">
                        <img
                            src={logoWasc}
                            alt="WASC Inmobiliaria Logo"
                            className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                    </Link>

                    {/* Menú de Navegación (Escritorio) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/wasc"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="wasc/propierties"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Catálogo
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Contacto
                        </Link>
                    </nav>

                    {/* Botón de Acción Principal (CTA) */}
                    <div className="hidden md:flex items-center">
                        <Link
                            href="/inmuebles"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                        >
                            Publicar Propiedad
                        </Link>
                    </div>

                    {/* Botón de Menú Hamburguesa (Móvil) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md"
                            aria-label="Toggle Menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable (Móvil) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
                    <Link
                        href="/inmuebles"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                        Inicio
                    </Link>
                    <Link
                        href="/inmuebles"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                        Catálogo
                    </Link>
                    <Link
                        href="#"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                        Nosotros
                    </Link>
                    <Link
                        href="#"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                        Contacto
                    </Link>
                    <div className="pt-2">
                        <Link
                            href="/inmuebles"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
                        >
                            Publicar Propiedad
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}