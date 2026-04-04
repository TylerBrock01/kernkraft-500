'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Detectamos el scroll para cambiar el estado del header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'py-4 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800/50'
                    : 'py-8 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* LOGO: Minimalista y fuerte */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-zinc-100 rounded-sm flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-500">
                        <span className="text-zinc-950 font-black text-xs">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-zinc-100">
            CRUX <span className="text-zinc-500 font-light italic">AERO</span>
          </span>
                </div>

                {/* NAVEGACIÓN: Estilo MCU / HUD */}
                <nav className="hidden md:flex items-center gap-8">
                    {['Motor', 'Arquitectura', 'Agencia', 'Contacto'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-100 transition-colors font-medium"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* BOTÓN DE ACCESO: El portal al backend */}
                <div className="flex items-center gap-4">
                    <Link href={'auth/login'} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                        Login
                    </Link>
                    <button className="px-5 py-2 bg-zinc-100 text-zinc-950 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm">
                        Launch Engine
                    </button>
                </div>

            </div>

</motion.header>
);
}