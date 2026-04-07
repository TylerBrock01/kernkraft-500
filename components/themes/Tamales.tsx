'use client';

import React from 'react';
import { motion } from 'framer-motion';

// =========================================
// 🌽 DATOS MOCKEADOS (Boutique Artesanal)
// =========================================
const TAMALERIA_DATA = {
    name: "La Molienda",
    subtitle: "Tamalería de Autor",
    tagline: "El abrazo cálido del maíz sonorense en cada bocado.",
    about: "Rescatamos las recetas de las abuelas y las elevamos. Nixtamalizamos nuestro propio maíz a mano todos los días, cocinamos a fuego lento con leña de mezquite y envolvemos cada historia con absoluta dedicación.",
    contact: {
        address: "Plaza del Origen, Local 4",
        phone: "Pedidos: (662) 555-1234",
        instagram: "@lamolienda.artesanal"
    },
    menu: [
        {
            id: 1,
            name: "Chile Colorado con Res",
            desc: "Carne deshebrada cocinada por 12 horas en salsa tatemada de chiles secos, envuelto en hoja de maíz.",
            price: "$45 MXN",
            tag: "TRADICIÓN"
        },
        {
            id: 2,
            name: "Elote Tierno con Queso",
            desc: "Masa dulce de elote fresco, relleno de rajas poblanas y queso crema derretido. Un clásico abrazador.",
            price: "$40 MXN",
            tag: "FAVORITO"
        },
        {
            id: 3,
            name: "Gourmet de Huitlacoche",
            desc: "Trufa mexicana salteada con epazote, flor de calabaza y queso de rancho. Envuelto en hoja de plátano.",
            price: "$65 MXN",
            tag: "DE AUTOR"
        },
        {
            id: 4,
            name: "Café de Olla & Champurrado",
            desc: "Bebidas tradicionales en jarro de barro, endulzadas con piloncillo y canela entera.",
            price: "$35 MXN",
            tag: "BEBIDAS"
        }
    ]
};

export default function TamalesThemeMockup() {
    return (
        // Fondo crema cálido, texto marrón oscuro
        <div className="min-h-screen bg-[#FDFBF7] text-[#3E2723] font-sans selection:bg-[#2E7D32]/20">

            {/* 🌾 NAVBAR DELICADO */}
            <nav className="flex justify-between items-center p-6 lg:px-12 absolute top-0 w-full z-50">
                <div className="font-serif text-2xl tracking-tight font-medium text-[#D84315]">
                    La Molienda<span className="text-[#2E7D32]">.</span>
                </div>
                <button className="text-[#3E2723] font-medium text-xs uppercase tracking-widest border-b border-[#3E2723] pb-1 hover:text-[#D84315] hover:border-[#D84315] transition-colors">
                    Hacer un Pedido
                </button>
            </nav>

            {/* 🏺 HERO SECTION (Estilo Arco Arquitectónico) */}
            <section className="relative min-h-[90vh] pt-24 lg:pt-0 flex items-center px-6 lg:px-12 overflow-hidden">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                    {/* Lado Izquierdo: Texto Elegante */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        <p className="text-[#2E7D32] font-medium text-xs lg:text-sm uppercase tracking-[0.3em] mb-6">
                            {TAMALERIA_DATA.subtitle}
                        </p>
                        <h1 className="text-6xl lg:text-8xl font-serif leading-[0.9] tracking-tighter mb-8 text-[#3E2723]">
                            Hechos a <br className="hidden lg:block" />
                            <span className="italic text-[#D84315]">Mano.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-[#5D4037] font-light mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
                            {TAMALERIA_DATA.tagline}
                        </p>
                        <button className="px-8 py-4 bg-[#3E2723] text-[#FDFBF7] font-medium uppercase tracking-widest text-xs rounded-full hover:bg-[#D84315] transition-colors duration-300 shadow-xl shadow-[#3E2723]/10">
                            Ver Menú del Día
                        </button>
                    </motion.div>

                    {/* Lado Derecho: Imagen en forma de Arco */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md aspect-[3/4] bg-[#F5EFE6] rounded-t-[200px] rounded-b-3xl overflow-hidden shadow-2xl shadow-[#3E2723]/5 border-8 border-white flex flex-col items-center justify-center text-[#A1887F]">
                            {/* 📸 FOTO AQUÍ: Ponle un object-cover a tu imagen */}
                            <span className="text-5xl mb-4">🫔</span>
                            <span className="text-xs uppercase tracking-widest font-medium">Foto Vertical Aquí</span>

                            {/* Sello Flotante (Se coloca sobre la imagen) */}
                            <div className="absolute -bottom-4 -left-4 lg:-left-12 bg-[#FDFBF7] p-6 rounded-full shadow-xl">
                                <div className="w-24 h-24 border border-dashed border-[#D84315] rounded-full flex items-center justify-center text-center">
                                    <p className="text-[9px] uppercase tracking-widest font-bold text-[#D84315] leading-tight">
                                        Receta<br/>Familiar<br/>Original
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 🌿 NUESTRA ESENCIA (Pilares de calidad) */}
            <section className="py-24 px-6 lg:px-12 bg-[#F5EFE6]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center max-w-2xl mx-auto mb-20"
                    >
                        <h2 className="text-3xl lg:text-5xl font-serif text-[#3E2723] mb-6">El Ritual del Maíz</h2>
                        <p className="text-[#5D4037] leading-relaxed font-light text-lg">
                            {TAMALERIA_DATA.about}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { title: "Masa Nixtamalizada", desc: "Molida en piedra volcánica cada madrugada.", icon: "🌽" },
                            { title: "Cocción Lenta", desc: "Guisos reposados por horas para concentrar el sabor.", icon: "🔥" },
                            { title: "Empaque Natural", desc: "Hojas seleccionadas que aportan aroma y protegen.", icon: "🍃" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#FDFBF7] flex items-center justify-center text-2xl mb-6 shadow-sm border border-[#EFEBE0]">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-serif font-medium text-[#3E2723] mb-3">{item.title}</h3>
                                <p className="text-[#795548] text-sm font-light leading-relaxed px-4">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🍽️ EL MENÚ (Estilo Cartas Finas) */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-[#D84315] mb-4">〰️</span>
                        <h2 className="text-4xl lg:text-5xl font-serif text-[#3E2723] mb-4">La Ofrenda</h2>
                        <p className="text-xs uppercase tracking-widest text-[#795548]">Recién salidos de la olla</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TAMALERIA_DATA.menu.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-[#F0ECE1] shadow-[0_10px_40px_rgba(62,39,35,0.03)] hover:shadow-[0_10px_40px_rgba(62,39,35,0.08)] transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-1 rounded-sm">
                      {item.tag}
                    </span>
                                        <span className="font-serif text-xl text-[#D84315]">{item.price}</span>
                                    </div>
                                    <h3 className="text-2xl font-serif text-[#3E2723] mb-3">{item.name}</h3>
                                    <p className="text-[#795548] text-sm leading-relaxed font-light mb-6">
                                        {item.desc}
                                    </p>
                                </div>

                                <button className="w-full py-3 border border-[#EFEBE0] rounded-full text-xs font-medium uppercase tracking-widest text-[#5D4037] hover:border-[#D84315] hover:text-[#D84315] transition-colors">
                                    Agregar a la canasta
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🏺 FOOTER MINIMALISTA */}
            <footer className="py-20 bg-[#3E2723] text-[#EFEBE0] text-center rounded-t-[40px] mt-12 mx-2 lg:mx-6">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-serif italic mb-10 text-[#FDFBF7]">"Con el mismo amor de siempre."</h2>

                    <div className="flex flex-col gap-3 font-light text-sm mb-16">
                        <p>{TAMALERIA_DATA.contact.address}</p>
                        <p>{TAMALERIA_DATA.contact.phone}</p>
                        <p className="text-[#D84315] hover:text-[#FDFBF7] cursor-pointer transition-colors mt-2">
                            {TAMALERIA_DATA.contact.instagram}
                        </p>
                    </div>

                    <div className="pt-8 border-t border-[#5D4037]/50">
                        <p className="text-[10px] uppercase tracking-widest text-[#A1887F]">
                            Diseñado por <span className="font-bold text-[#FDFBF7]">CAZA Engine</span>
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}