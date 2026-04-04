'use client';

import React from 'react';
import { motion } from 'framer-motion';

// 🌭 MOCK DATA: Datos simulados, no toca el backend para nada.
const MOCK_BUSINESS = {
    name: "Dogos El Güero",
    description: "Los verdaderos jochos callejeros. Si no te manchas, no cuenta. Preparados al carbón con la receta secreta."
};

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "El Clásico",
        description: "Salchicha de pavo, tocino crujiente, cebolla caramelizada, tomate, mayonesa, mostaza y kétchup.",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Dogo Monstruo",
        description: "Doble salchicha para asar, costra de queso Chihuahua gratinado, champiñones, tocino y aderezo chipotle.",
        price: 65.00,
        image: "https://images.unsplash.com/photo-159016548215-6b2a14bc41f3?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Papas Especiales",
        description: "Corte grueso a la francesa, bañadas en queso cheddar líquido, lluvia de tocino ahumado y jalapeños frescos.",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Dogo Hawaiano",
        description: "El toque dulce. Salchicha cubierta de tocino, piña asada, jamón ahumado y extra queso derretido.",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"
    }
];

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-orange-50 font-sans text-neutral-900 selection:bg-yellow-400 selection:text-red-900">

            {/* 🔴 NAVEGACIÓN TÁCTICA */}
            <nav className="bg-red-600 text-white p-4 shadow-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-2">
                        <span className="text-3xl">🌭</span> {MOCK_BUSINESS.name}
                    </h1>
                    <button className="bg-yellow-400 text-red-900 px-6 py-2.5 rounded-full font-black uppercase text-xs hover:bg-yellow-300 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:translate-y-[2px]">
                        Pedir Ahora
                    </button>
                </div>
            </nav>

            {/* 🔥 HERO SECTION IMPACTANTE */}
            <header className="relative max-w-6xl mx-auto py-24 px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-red-100 text-red-600 font-bold uppercase tracking-widest text-[10px] px-3 py-1 rounded-full mb-6 border border-red-200">
              Menú Digital
            </span>
                        <h2 className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter uppercase leading-[0.9]">
                            Puro Sabor <br/>
                            <span className="text-yellow-500 stroke-text" style={{ WebkitTextStroke: '2px #b91c1c' }}>Callejero.</span>
                        </h2>
                        <p className="mt-8 text-lg md:text-xl text-neutral-600 font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
                            {MOCK_BUSINESS.description}
                        </p>

                        <div className="mt-10 flex gap-4 justify-center md:justify-start">
                            <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
                                Ver Menú
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Adorno visual en la cabecera */}
                <div className="flex-1 w-full h-[400px] relative hidden md:block">
                    <motion.div
                        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="absolute inset-0 bg-yellow-400 rounded-[3rem] shadow-2xl transform rotate-3 flex items-center justify-center overflow-hidden border-8 border-white"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=1000&q=80"
                            alt="Hotdog hero"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </header>

            {/* 🛒 EL MENÚ DE CRISTAL (Grid) */}
            <main className="bg-white/50 backdrop-blur-3xl py-20 border-t border-red-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">El Menú</h2>
                        <div className="h-1 flex-1 bg-red-100 mx-6 rounded-full hidden md:block"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {MOCK_PRODUCTS.map((product, index) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white p-4 rounded-[2rem] shadow-xl shadow-red-900/5 border border-red-50 flex flex-col sm:flex-row gap-6 hover:-translate-y-2 transition-transform duration-300 group"
                            >
                                {/* Fotografía Cuadrada */}
                                <div className="w-full sm:w-40 h-48 sm:h-auto rounded-[1.5rem] overflow-hidden shrink-0 relative bg-neutral-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden"></div>
                                </div>

                                {/* Detalles */}
                                <div className="flex flex-col justify-center flex-1 py-2">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-xl font-black text-neutral-900 uppercase leading-tight">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-neutral-500 mt-3 mb-6 leading-relaxed line-clamp-3">
                                        {product.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="inline-block bg-yellow-400 text-red-900 font-black px-4 py-1.5 rounded-lg text-xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                                            ${product.price.toFixed(2)}
                                        </div>

                                        <button className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xl font-bold hover:bg-red-600 hover:text-white transition-colors">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </main>

            {/* 🚀 FOOTER DE AGENCIA */}
            <footer className="bg-neutral-950 py-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 mb-2">
                        Infraestructura tecnológica por
                    </p>
                    <div className="text-white font-black tracking-widest text-lg">
                        CAZA
                    </div>
                    <p className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1">
                        Universal Commerce Engine
                    </p>
                </div>
            </footer>
        </div>
    );
}