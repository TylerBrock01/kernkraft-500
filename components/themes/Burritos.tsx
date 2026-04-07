'use client';

import React from 'react';
import { motion } from 'framer-motion';

// =========================================
// 🌯 DATOS MOCKEADOS (Estilo Street Food)
// =========================================
const BURRITO_DATA = {
    name: "LA BESTIA",
    subtitle: "STREET FOOD & GRILL",
    tagline: "El tamaño de tu hambre en una tortilla sobaquera.",
    about: "Con el calor del desierto sonorense y la actitud de las calles salvajes de Ensenada. No hacemos 'wraps', hacemos burritos reales con carne asada que sabe a lumbre y salsas que no perdonan.",
    contact: {
        phone: "WhatsApp: +52 (662) 555-0192",
        address: "Food Truck Park, Calle Principal",
        instagram: "@labestia.burritos"
    },
    menu: [
        {
            id: 1,
            name: "El Patrón",
            desc: "Medio kilo de pura carne asada al carbón, guacamole espeso, queso Chihuahua derretido y frijoles maneados.",
            price: "$140",
            spicyLevel: "🌶️",
        },
        {
            id: 2,
            name: "La Patrona",
            desc: "Auténtica machaca sonorense guisada con verdura, huevo, y nuestra salsa tatemada secreta.",
            price: "$120",
            spicyLevel: "🌶️🌶️",
        },
        {
            id: 3,
            name: "El Abusón (Monster)",
            desc: "Doble porción de carne, adobada, tocino crujiente, costra de queso y papas fritas adentro. Solo para valientes.",
            price: "$210",
            spicyLevel: "🌶️🌶️🌶️",
        }
    ]
};

export default function BurritoThemeMockup() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-orange-500/30 overflow-x-hidden">

            {/* 🚀 NAVBAR URBANO */}
            <nav className="flex justify-between items-center p-6 lg:px-12 absolute top-0 w-full z-50">
                <div className="font-black text-2xl tracking-tighter text-white">LA <span className="text-orange-600">BESTIA.</span></div>
                <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition-all">
                    Ordena Ya
                </button>
            </nav>

            {/* 🔥 HERO SECTION (Asimétrico: Texto a la izquierda, "Imagen" a la derecha) */}
            <section className="relative min-h-[95vh] pt-24 lg:pt-0 flex items-center px-6 lg:px-12">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                    {/* Lado Izquierdo: Tipografía Brutalista */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <p className="text-orange-500 font-bold text-sm lg:text-base uppercase tracking-[0.3em] mb-4 border-l-4 border-orange-500 pl-3">
                            {BURRITO_DATA.subtitle}
                        </p>
                        <h1 className="text-7xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8 uppercase text-white drop-shadow-2xl">
                            PURO<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FUEGO.</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-zinc-400 font-medium mb-10 max-w-md">
                            {BURRITO_DATA.tagline}
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300">
                                Ver Menú
                            </button>
                        </div>
                    </motion.div>

                    {/* Lado Derecho: Contenedor Dinámico para la Foto de Comida */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2, type: "spring" }}
                        className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center"
                    >
                        {/* Círculo decorativo de fondo */}
                        <div className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-orange-600 rounded-full blur-[80px] opacity-20"></div>

                        {/* 📸 AQUÍ VA LA IMAGEN DEL BURRITO EN PNG SIN FONDO */}
                        <div className="relative z-10 w-full h-full bg-zinc-900/50 border-2 border-dashed border-zinc-700 rounded-full flex flex-col items-center justify-center text-zinc-500 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                            <span className="text-4xl mb-2">🌯</span>
                            <span className="text-xs font-mono uppercase tracking-widest">Coloca tu PNG aquí</span>
                        </div>

                        {/* Sello Flotante */}
                        <div className="absolute -bottom-6 -left-6 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] w-32 h-32 rounded-full flex items-center justify-center text-center p-4 border-4 border-[#0a0a0a] rotate-12 shadow-2xl z-20">
                            Tortilla<br/>Sobaquera<br/>100%
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 🚧 MARQUEE (Cinta infinita estilo barricada) */}
            <div className="w-full bg-orange-600 text-black py-4 overflow-hidden border-y-4 border-white rotate-[-2deg] scale-105 shadow-2xl relative z-20">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
                    className="flex whitespace-nowrap font-black uppercase tracking-widest text-xl lg:text-2xl"
                >
                    <span className="mx-4">🔥 100% CARNE ASADA</span>
                    <span className="mx-4">🔥 DE SONORA PARA EL MUNDO</span>
                    <span className="mx-4">🔥 NO HACEMOS WRAPS</span>
                    <span className="mx-4">🔥 100% CARNE ASADA</span>
                    <span className="mx-4">🔥 DE SONORA PARA EL MUNDO</span>
                    <span className="mx-4">🔥 NO HACEMOS WRAPS</span>
                    <span className="mx-4">🔥 100% CARNE ASADA</span>
                </motion.div>
            </div>

            {/* 🥩 NUESTRA HISTORIA (Texto enorme e impactante) */}
            <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto mt-12">
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-2xl lg:text-5xl font-black text-zinc-300 leading-tight uppercase tracking-tight text-center lg:text-left"
                >
                    {BURRITO_DATA.about}
                </motion.p>
            </section>

            {/* 🌶️ EL MENÚ (Estilo Lista de Pizarra, NO Tarjetas) */}
            <section className="py-20 px-6 lg:px-12 bg-zinc-950">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white">El Pizarrón</h2>
                        <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mt-2">Cuidado con las salsas</p>
                    </div>

                    <div className="flex flex-col border-t-2 border-zinc-800">
                        {BURRITO_DATA.menu.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 lg:py-12 border-b-2 border-zinc-800 hover:bg-zinc-900/50 transition-colors px-4 -mx-4 rounded-lg"
                            >
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-tight group-hover:text-orange-500 transition-colors">{item.name}</h3>
                                        <span className="text-xl">{item.spicyLevel}</span>
                                    </div>
                                    <p className="text-zinc-400 font-medium text-sm lg:text-base leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-6 md:mt-0 flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <span className="text-3xl lg:text-5xl font-black text-white">{item.price}</span>
                                    <button className="w-12 h-12 rounded-full border-2 border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all font-black text-2xl pb-1">
                                        +
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🏁 FOOTER GIGANTE */}
            <footer className="py-24 bg-orange-600 text-black text-center px-6">
                <h2 className="text-5xl lg:text-[8rem] font-black uppercase tracking-tighter leading-none mb-12">
                    CÁELE YA.
                </h2>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 font-bold text-lg lg:text-2xl uppercase tracking-tight">
                    <p>📍 {BURRITO_DATA.contact.address}</p>
                    <p>📱 {BURRITO_DATA.contact.phone}</p>
                    <a href="#" className="hover:text-white transition-colors">{BURRITO_DATA.contact.instagram}</a>
                </div>

                <div className="mt-20 pt-8 border-t-4 border-black/20 max-w-md mx-auto">
                    <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-black/60">
                        Powered by CAZA Engine
                    </p>
                </div>
            </footer>
        </div>
    );
}