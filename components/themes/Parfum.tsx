'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---
const PRODUCTS = [
    {
        id: 1,
        name: "Nº 1 DE CAZA",
        category: "L'ESSENCE",
        description: "Una sinfonía de sándalo y notas marinas de Ensenada.",
        price: "$4,200",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "BLEU CRUX",
        category: "ELIXIR PURE",
        description: "La frescura del acero y la madera oscura.",
        price: "$3,850",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "AERO BLANC",
        category: "EAU DE PARFUM",
        description: "Jazmín blanco destilado bajo el sol del desierto.",
        price: "$5,100",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function ChanelStylePerfumery() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="z-0 bg-white min-h-screen text-[#1A1A1A] font-serif selection:bg-black selection:text-white">

            {/* --- Navigation --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 md:px-12 py-6 flex justify-between items-center">
                <div className="flex-1 hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-sans font-bold">
                    <a href="#" className="hover:opacity-50 transition-opacity">Colecciones</a>
                    <a href="#" className="hover:opacity-50 transition-opacity">La Maison</a>
                </div>

                <h1 className="text-xl md:text-2xl tracking-[0.4em] font-light uppercase text-center flex-1">
                    CAZA PARFUMS
                </h1>

                <div className="flex-1 flex justify-end gap-6 md:gap-8 text-[10px] uppercase tracking-[0.3em] font-sans font-bold">
                    <span className="cursor-pointer hidden md:block">Buscar</span>
                    <span className="cursor-pointer">Bolsa (0)</span>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                        {isMenuOpen ? 'Cerrar' : 'Menu'}
                    </button>
                </div>
            </nav>

            {/* --- Mobile Menu --- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-8 md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-xl uppercase tracking-widest font-light">
                            <a href="#">Colecciones</a>
                            <a href="#">La Maison</a>
                            <a href="#">Boutiques</a>
                            <a href="#">Contacto</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Hero Section --- */}
            <section className="bg-black relative h-screen index  text-white flex flex-col items-center justify-center overflow-hidden px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://res.cloudinary.com/tyler-brock/image/upload/v1775843898/Black_and_white_202604101057_yndvql.jpg"
                        className="w-full h-full object-cover grayscale opacity-20"
                        alt="Hero background"
                    />
                </motion.div>

                <div className="relative z-10 text-center space-y-8 max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.8em] font-sans text-black/40 block"
                    >
                        Edición Limitada
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-5xl md:text-8xl font-light italic tracking-tighter leading-tight"
                    >
                        L'Éclat de la Nuit
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-sm md:text-base font-sans font-light tracking-wide text-white/60 max-w-md mx-auto leading-relaxed"
                    >
                        Una fragancia que captura la precisión técnica de CAZA con la elegancia eterna de la alta perfumería.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                    >
                        <button className="mt-8 px-12 py-4 border border-white text-[10px] uppercase tracking-[0.4em] font-sans font-bold hover:bg-black hover:text-white transition-all duration-700">
                            Ver la Colección
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* --- Catalog Grid --- */}
            <section className=" max-w-7xl mx-auto py-24 md:py-40 px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-[#F2F1EF] mb-8 relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-black/40 font-sans font-bold block">
                  {product.category}
                </span>
                                <div className="flex justify-between items-baseline border-b border-black/10 pb-4">
                                    <h3 className="text-xl font-medium tracking-tight group-hover:italic transition-all uppercase">
                                        {product.name}
                                    </h3>
                                    <span className="text-sm font-sans font-light">{product.price}</span>
                                </div>
                                <p className="text-xs text-black/50 italic leading-relaxed pt-2">
                                    {product.description}
                                </p>
                                <button className="text-[9px] uppercase tracking-[0.3em] font-sans font-black pt-4 block hover:ml-2 transition-all">
                                    Explorar +
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Brand Statement --- */}
            <section className="bg-black text-[#FDFCFB] py-32 md:py-52 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-3xl mx-auto space-y-12"
                >
                    <h3 className="text-[10px] uppercase tracking-[0.8em] font-sans opacity-40">La Filosofía CAZA</h3>
                    <p className="text-2xl md:text-5xl font-light italic leading-tight">
                        "La precisión es la forma más elevada de la elegancia."
                    </p>
                    <div className="w-16 h-[1px] bg-white/20 mx-auto"></div>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold opacity-60">
                        Atelier Ensenada • 2026
                    </p>
                </motion.div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-20 px-6 md:px-12 border-t border-black/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
                    <div className="space-y-8">
                        <h2 className="text-2xl tracking-[0.5em] font-light uppercase">CAZA</h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                            <a href="#" className="text-[9px] uppercase tracking-widest text-black/50 hover:text-black">Privacidad</a>
                            <a href="#" className="text-[9px] uppercase tracking-widest text-black/50 hover:text-black">Servicios</a>
                            <a href="#" className="text-[9px] uppercase tracking-widest text-black/50 hover:text-black">Boutiques</a>
                            <a href="#" className="text-[9px] uppercase tracking-widest text-black/50 hover:text-black">Legal</a>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 font-sans">Suscripción Exclusiva</h4>
                        <div className="flex border-b border-black pb-2 group">
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className="bg-transparent text-[10px] uppercase tracking-widest outline-none flex-1 placeholder:text-black/20"
                            />
                            <button className="text-[10px] uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform">Ok</button>
                        </div>
                        <p className="text-[8px] uppercase tracking-widest text-black/30 mt-4 leading-loose">
                            Reciba las últimas transmisiones del motor CAZA en su bandeja de entrada.
                        </p>
                    </div>
                </div>
                <div className="mt-24 pt-8 border-t border-black/5 text-center text-[8px] uppercase tracking-[0.6em] text-black/20 font-sans">
                    © 2026 CAZA AGENCY • TODOS LOS DERECHOS RESERVADOS
                </div>
            </footer>
        </div>
    );
}