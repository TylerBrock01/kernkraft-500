'use client';

import React from 'react';
import { motion } from 'framer-motion';

// =========================================
// 🍔 DATOS MOCKEADOS (Temática Picnic & Fresh)
// =========================================
const BURGER_DATA = {
    name: "La Canasta",
    subtitle: "SMASH BURGERS & SUNSHINE",
    tagline: "Sabor a domingo en el parque, todos los días.",
    about: "Nuestras hamburguesas saben a recuerdos felices. Carne fresca aplastada a la perfección, pan brioche suave como una nube y vegetales crujientes. Extiende el mantel y prepárate para morder la felicidad.",
    contact: {
        address: "Parque Central, Kiosco 2",
        phone: "Pide tu canasta: (662) 555-0011",
        instagram: "@lacanasta.burgers"
    },
    menu: [
        {
            id: 1,
            name: "La Clásica de Día de Campo",
            desc: "Doble carne smash, queso americano derretido, lechuga fresca, tomate y nuestra salsa secreta de la abuela.",
            price: "$130",
            tag: "FAVORITA",
        },
        {
            id: 2,
            name: "Pollo Crujiente bajo el Sol",
            desc: "Pechuga de pollo frita extracrujiente, ensalada de col (coleslaw) dulce y pepinillos caseros.",
            price: "$145",
            tag: "NUEVA",
        },
        {
            id: 3,
            name: "Canasta Familiar (Para Compartir)",
            desc: "4 Smash Burgers clásicas, una montaña de papas fritas, aros de cebolla y 4 limonadas heladas.",
            price: "$490",
            tag: "COMBO",
        }
    ],
    reviews: [
        { text: "Literalmente saben a las parrilladas que hacía mi papá. El pan es una locura de suave.", author: "Mariana L." },
        { text: "Me encanta el concepto. Te entregan todo en una cajita de picnic hermosa. Las papas son 10/10.", author: "Diego V." }
    ]
};

// Patrón SVG para el mantel de picnic
const checkeredPattern = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23ffffff"/><path d="M0,0 h20 v20 h-20 z M20,20 h20 v20 h-20 z" fill="%23ef4444"/></svg>')`;

export default function BurgerPicnicTheme() {
    return (
        <div className="min-h-screen bg-[#FFFDF5] text-stone-800 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">

            {/* 🧺 NAVBAR DE MANTEL */}
            <nav
                className="w-full h-12 shadow-md relative z-50 flex items-center justify-center border-b-4 border-red-700"
                style={{ backgroundImage: checkeredPattern }}
            >
                <div className="bg-white px-6 py-1 rounded-full shadow-sm border-2 border-red-600 font-black text-red-600 tracking-widest uppercase text-xs transform -rotate-2">
                    ¡Abierto y con el carbón listo!
                </div>
            </nav>

            {/* ☀️ HERO SECTION (Alegre y Rebotón) */}
            <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">

                {/* Decoraciones de fondo flotantes */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-[60px] opacity-50"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-300 rounded-full blur-[60px] opacity-30"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
                >
                    {/* Logo Badge */}
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white text-4xl">
                        🧺
                    </div>

                    <p className="font-bold text-emerald-600 uppercase tracking-widest text-sm mb-4">
                        {BURGER_DATA.subtitle}
                    </p>

                    <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tight mb-6">
                        LA <span className="text-red-600">CANASTA</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-stone-500 font-medium mb-10 max-w-xl">
                        {BURGER_DATA.tagline}
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-lg rounded-full shadow-[0_10px_0px_#b91c1c] hover:shadow-[0_5px_0px_#b91c1c] hover:translate-y-[5px] transition-all"
                    >
                        Quiero mi Canasta
                    </motion.button>
                </motion.div>
            </section>

            {/* 🌳 LA EXPERIENCIA (Colores de la naturaleza) */}
            <section className="py-24 px-6 bg-emerald-600 text-white relative overflow-hidden rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                {/* Nubes SVG Decorativas */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFDF5"></path>
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto text-center mt-12 relative z-10">
                    <span className="text-5xl mb-6 block drop-shadow-md">🍔 🍟 🥤</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl md:text-5xl font-black mb-8"
                    >
                        LA RECETA PARA UN BUEN DÍA
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-medium leading-relaxed text-emerald-100"
                    >
                        {BURGER_DATA.about}
                    </motion.p>
                </div>
            </section>

            {/* 🥪 EL MENÚ (Tarjetas amigables) */}
            <section className="py-24 px-4 md:px-8 bg-[#FFFDF5] relative">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col items-center mb-16 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-red-600 tracking-tight mb-4">Directo a la Manta</h2>
                        <p className="text-stone-500 font-bold uppercase tracking-widest text-sm">Nuestras especialidades</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {BURGER_DATA.menu.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.15, type: "spring", bounce: 0.4 }}
                                className="bg-white border-4 border-stone-100 rounded-3xl p-8 flex flex-col justify-between hover:border-yellow-400 hover:shadow-2xl hover:-translate-y-2 transition-all"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                    <span className="bg-yellow-400 text-stone-900 font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                      {item.tag}
                    </span>
                                        <span className="text-2xl font-black text-red-600">{item.price}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-stone-800 mb-3 leading-tight">{item.name}</h3>
                                    <p className="text-stone-500 font-medium leading-relaxed mb-8">
                                        {item.desc}
                                    </p>
                                </div>

                                <button className="w-full bg-stone-100 text-stone-800 hover:bg-emerald-500 hover:text-white font-bold uppercase py-4 rounded-xl transition-colors">
                                    Agregar a la Canasta
                                </button>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 🗣️ RESEÑAS (Globos de diálogo de cómic/dibujo) */}
            <section className="py-24 bg-stone-100">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-stone-800 text-center mb-16">Lo que dice la familia</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {BURGER_DATA.reviews.map((r, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative bg-white p-8 rounded-3xl shadow-lg border-2 border-stone-200"
                            >
                                {/* Triángulo del globo de diálogo */}
                                <div className="absolute -bottom-4 left-10 w-8 h-8 bg-white border-b-2 border-r-2 border-stone-200 transform rotate-45"></div>

                                <p className="text-lg text-stone-600 font-medium mb-4">"{r.text}"</p>
                                <p className="text-red-600 font-black uppercase tracking-widest text-xs">{r.author}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🧺 FOOTER (El mantel de regreso) */}
            <footer
                className="relative pt-20 pb-10 text-center px-6 mt-12"
                style={{ backgroundImage: checkeredPattern }}
            >
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]"></div>

                <div className="relative z-10 max-w-3xl mx-auto bg-white p-12 rounded-[3rem] shadow-xl border-4 border-red-600 transform rotate-1">
                    <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-8">
                        NOS VEMOS EN EL PARQUE
                    </h2>

                    <div className="space-y-3 text-stone-600 font-bold text-lg mb-10">
                        <p>📍 {BURGER_DATA.contact.address}</p>
                        <p>📞 {BURGER_DATA.contact.phone}</p>
                        <p className="text-red-600">{BURGER_DATA.contact.instagram}</p>
                    </div>

                    <div className="pt-6 border-t-2 border-stone-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                            Hecho con cariño por <span className="text-red-600">CAZA Engine</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}