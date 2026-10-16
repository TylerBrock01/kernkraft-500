'use client';

import { useState } from 'react';
import Link from 'next/link';
import {logoWasc} from "@/app/wasc/data/properties";

const navItems = [
    {
        label: 'Inicio',
        href: '/wasc',
    },
    {
        label: 'Catálogo',
        href: '/wasc/properties',
    },
    {
        label: 'Nosotros',
        href: '/wasc/2',
    },
    {
        label: 'Contacto',
        href: '/wasc/3',
    },
];

const desktopLinkClassName =
    'text-sm font-medium text-gray-700 hover:text-red-600 transition-colors';

const mobileLinkClassName =
    'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50';

const ctaHref = '/inmuebles';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((currentValue) => !currentValue);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logotipo WASC */}
                    <Link href="/wasc" className="flex items-center gap-2 group">
                        <img
                            src={logoWasc}
                            alt="WASC Inmobiliaria Logo"
                            className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                    </Link>

                    {/* Menú de Navegación (Escritorio) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={desktopLinkClassName}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Botón de Acción Principal (CTA) */}
                    <div className="hidden md:flex items-center">
                        <Link
                            href={ctaHref}
                            className="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                        >
                            Publicar Propiedad
                        </Link>
                    </div>

                    {/* Botón de Menú Hamburguesa (Móvil) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md"
                            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={isMenuOpen}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable (Móvil) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className={mobileLinkClassName}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="pt-2">
                        <Link
                            href={ctaHref}
                            onClick={closeMenu}
                            className="block w-full text-center bg-red-500 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all"
                        >
                            Publicar Propiedad
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}