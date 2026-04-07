'use client';

import React from 'react';
import { motion } from 'framer-motion';

// =========================================
// 🥊 DATOS MOCKEADOS (Fight Club / Lucha Libre)
// =========================================
const TORTAS_DATA = {
    name: "EL NOCKOUT",
    subtitle: "TORTAS DE PESO COMPLETO",
    tagline: "Ríndete ante el sabor. A dos de tres mordidas.",
    about: "Aquí no venimos a jugar. Nuestras tortas están armadas para noquear el hambre más cabrona. Telera crujiente, milanesa que se desborda del ring, y salsas que pegan más duro que un gancho al hígado.",
    contact: {
        address: "Esquina del Cuadrilátero, Centro",
        phone: "Llama para recoger: (662) 555-9988",
        instagram: "@tortas.nockout"
    },
    menu: [
        {
            id: 1,
            name: "La Máscara",
            desc: "Milanesa de res, quesillo deshebrado, jamón ahumado y piña asada. Pura técnica.",
            price: "$95",
            weight: "700g",
        },
        {
            id: 2,
            name: "El Rudo",
            desc: "Pierna de puerco horneada, chorizo, tocino grueso y chipotle tatemado. Sin reglas.",
            price: "$110",
            weight: "850g",
        },
        {
            id: 3,
            name: "Gancho al Hígado (Monster)",
            desc: "Salchicha, huevo, jamón, milanesa, chorizo, queso de puerco y aguacate. Si te la acabas, la casa invita.",
            price: "$160",
            weight: "1.2 KG",
        }
    ],
    reviews: [
        { text: "Me aplicó la quebradora y me mandó a dormir toda la tarde. El Mal del Puerco es real.", author: "El Chino" },
        { text: "La milanesa está del tamaño de mi cara. El Rudo es el campeón indiscutible.", author: "Beto 'Mano Pesada'" }
    ]
};

export default function TortasFightTheme() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">

            {/* ⚠️ ALERTA SUPERIOR (Tape Style) */}
            <div className="w-full bg-yellow-400 text-black py-2 overflow-hidden flex items-center font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                <motion.div
                    animate={{ x: [0, -500] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 5 }}
                    className="flex whitespace-nowrap"
                >
                    <span className="mx-4">⚠️ PRECAUCIÓN: ALTO CALIBRE</span>
                    <span className="mx-4">⚠️ SÓLO EFECTIVO</span>
                    <span className="mx-4">⚠️ NO HAY CAMBIOS</span>
                    <span className="mx-4">⚠️ PRECAUCIÓN: ALTO CALIBRE</span>
                    <span className="mx-4">⚠️ SÓLO EFECTIVO</span>
                    <span className="mx-4">⚠️ NO HAY CAMBIOS</span>
                </motion.div>
            </div>

            {/* 🥊 HERO SECTION (Estilo Póster de Arena) */}
            <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-zinc-950">

                {/* Fondo Texturizado / Halftone */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3f3f46 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

                {/* Elemento de Diseño: Cinta Peligro Diagonal */}
                <div className="absolute top-1/4 -right-20 w-[120%] h-12 bg-yellow-400 rotate-[15deg] flex items-center opacity-10 pointer-events-none z-0"></div>
                <div className="absolute bottom-1/4 -left-20 w-[120%] h-16 bg-red-600 -rotate-[10deg] flex items-center opacity-10 pointer-events-none z-0"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                    className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center"
                >
                    <div className="bg-yellow-400 text-black px-6 py-2 transform -skew-x-12 mb-6 shadow-[8px_8px_0px_#dc2626]">
                        <p className="font-black text-sm md:text-xl uppercase tracking-widest italic">
                            {TORTAS_DATA.subtitle}
                        </p>
                    </div>

                    <h1 className="text-7xl md:text-[11rem] font-black leading-[0.8] tracking-tighter mb-6 uppercase text-white transform -skew-x-6 drop-shadow-2xl">
                        EL NOCK<span className="text-red-600">OUT</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-zinc-300 font-bold mb-12 uppercase tracking-tight transform -skew-x-6 max-w-2xl bg-black/50 p-4 border-l-8 border-yellow-400">
                        "{TORTAS_DATA.tagline}"
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-lg md:text-2xl transform skew-x-[-10deg] shadow-[10px_10px_0px_#facc15] hover:shadow-[15px_15px_0px_#facc15] transition-all border-4 border-black"
                    >
                        <span className="block transform skew-x-[10deg]">¡Entrar al Ring!</span>
                    </motion.button>
                </motion.div>
            </section>

            {/* 🩸 LA REGLA DEL JUEGO (About Us agresivo) */}
            <section className="py-24 px-6 bg-red-600 text-black border-y-8 border-black relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 transform -skew-x-6"
                    >
                        ¿Estás listo para el castigo?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl font-bold leading-tight"
                    >
                        {TORTAS_DATA.about}
                    </motion.p>
                </div>
            </section>

            {/* 📋 EL CARTEL ESTELAR (Menú estilo Fight Card) */}
            <section className="py-24 px-4 md:px-8 bg-zinc-900 relative">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col items-center mb-16">
                        <div className="bg-white text-black px-8 py-2 transform -skew-x-12 mb-4">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Cartelera Principal</h2>
                        </div>
                        <p className="text-yellow-400 font-bold uppercase tracking-widest text-xl">Máscara contra Hambre</p>
                    </div>

                    <div className="space-y-8">
                        {TORTAS_DATA.menu.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4 }}
                                className="bg-black border-4 border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-yellow-400 transition-colors transform hover:-translate-y-2 hover:shadow-[10px_10px_0px_#dc2626]"
                            >
                                {/* Lado izquierdo: Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mb-4">
                                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight transform -skew-x-6">{item.name}</h3>
                                        <span className="bg-zinc-800 text-yellow-400 font-bold px-3 py-1 text-sm uppercase tracking-widest transform -skew-x-6">
                      Peso: {item.weight}
                    </span>
                                    </div>
                                    <p className="text-zinc-400 font-medium text-lg leading-snug max-w-2xl">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Lado derecho: Precio y botón */}
                                <div className="flex flex-col items-center gap-4 shrink-0">
                                    <span className="text-5xl md:text-6xl font-black text-yellow-400">{item.price}</span>
                                    <button className="bg-zinc-800 hover:bg-white text-white hover:text-black border-2 border-transparent hover:border-black font-black uppercase px-6 py-3 text-sm tracking-widest transition-all transform -skew-x-6 w-full">
                                        <span className="block transform skew-x-6">Pedir</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 🗣️ LA TRIBUNA (Testimonios) */}
            <section className="py-24 bg-zinc-950 border-t-8 border-yellow-400">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-16 transform -skew-x-6">La Raza Habla</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TORTAS_DATA.reviews.map((r, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-zinc-900 border-l-8 border-red-600 text-left"
                            >
                                <p className="text-xl text-zinc-300 font-bold mb-6 italic uppercase">"{r.text}"</p>
                                <p className="text-yellow-400 font-black uppercase tracking-widest text-sm">— {r.author}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🏁 FOOTER PESADO */}
            <footer className="py-16 bg-black border-t-8 border-zinc-900 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 transform -skew-x-6">
                        TE VEMOS EN <span className="text-yellow-400">EL RING</span>
                    </h2>

                    <div className="space-y-4 text-zinc-400 font-bold text-xl uppercase tracking-widest">
                        <p className="hover:text-yellow-400 transition-colors cursor-pointer">{TORTAS_DATA.contact.address}</p>
                        <p className="text-red-500">{TORTAS_DATA.contact.phone}</p>
                        <p className="text-zinc-500">{TORTAS_DATA.contact.instagram}</p>
                    </div>

                    <div className="mt-16 pt-8 border-t-4 border-zinc-900">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-600">
                            Desarrollado a chingazos por <span className="text-zinc-400">CAZA Engine</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}