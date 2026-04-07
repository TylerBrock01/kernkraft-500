'use client';

import React from 'react';
import { motion } from 'framer-motion';

// =========================================
// 🎩 DATOS MOCKEADOS (Simulando lo que vendría de tu BD)
// =========================================
const MAGICIAN_DATA = {
    name: "AYAX Black",
    title: "Ilusionista & Mentalista",
    tagline: "No creas todo lo que ven tus ojos.",
    about: "Con más de 15 años de experiencia en escenarios internacionales, Dorian Black redefine lo imposible. Especialista en ilusionismo psicológico y magia de proximidad para eventos de alta gama.",
    contact: {
        phone: "+52 311 530 2987",
        email: "booking@dorianblack.com",
        instagram: "@dorian.black.magic"
    },
    services: [
        {
            id: 1,
            title: "Close-Up Magic",
            desc: "Magia a centímetros de tus ojos. Ideal para cócteles, bodas y recepciones. Cartomagia, monedas y lectura mental uno a uno.",
            price: "Desde $2,000 MXN",
            icon: "🃏"
        },
        {
            id: 2,
            title: "Show de Escenario",
            desc: "Un espectáculo completo de 60 minutos con ilusiones a gran escala, participación del público y mentalismo asombroso.",
            price: "Desde $3,500 MXN",
            icon: "🎭"
        },
        {
            id: 3,
            title: "Eventos Corporativos",
            desc: "Magia diseñada para integrar los valores de tu marca. Perfecto para lanzamientos de productos y cenas de fin de año.",
            price: "Cotización a medida",
            icon: "🕴️"
        }
    ],
    testimonials: [
        { text: "Aún no entiendo cómo adivinó el nombre de mi primer perro. Absolutamente increíble.", author: "CEO, TechNova" },
        { text: "El mejor show de entretenimiento que hemos contratado. Dejó a todos los invitados sin palabras.", author: "María S., Wedding Planner" }
    ]
};

export default function MadeByAyax() {
    return (
        <div
            className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-amber-500/30"
            style={{
                // 🚀 TÁCTICA CLOUDINARY: Usamos q_auto,f_auto para optimización extrema
                backgroundImage: `url('https://res.cloudinary.com/tyler-brock/image/upload/v1775526049/A_highly_sophisticated__202604061839_bs3yli.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >

            {/* 🔮 HERO SECTION */}
            {/* 🔮 HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
                {/* Efectos de luz misteriosa */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20 text-center max-w-4xl mx-auto"
                >
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                        className="text-amber-500/90 font-mono text-xs md:text-sm uppercase tracking-[0.6em] mb-6 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    >
                        {MAGICIAN_DATA.title}
                    </motion.p>

                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
                        {MAGICIAN_DATA.name}
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-300 font-light italic mb-12 drop-shadow-xl">
                        "{MAGICIAN_DATA.tagline}"
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-zinc-950/50 backdrop-blur-md border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]"
                    >
                        Agendar un Espectáculo
                    </motion.button>
                </motion.div>
            </section>

            {/* 🃏 BIOGRAFÍA BREVE */}
            <section className="py-24 px-6 md:px-12 border-y border-zinc-900/50 bg-zinc-950/80 backdrop-blur-xl relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <span className="text-4xl mb-6 block opacity-80">👁️</span>
                    <h2 className="text-xs font-bold font-mono text-amber-500/70 uppercase tracking-widest mb-8">El Artista</h2>
                    <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-serif font-light">
                        {MAGICIAN_DATA.about}
                    </p>
                </motion.div>
            </section>

            {/* 🎩 SERVICIOS */}
            <section className="py-32 px-4 md:px-12 relative z-20">
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                            Experiencias
                        </h2>
                        <span className="text-xs font-mono text-amber-500 tracking-[0.4em] uppercase">Formatos Disponibles</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MAGICIAN_DATA.services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 hover:border-amber-500/40 transition-all duration-500 group relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] rounded-sm"
                            >
                                {/* Brillo sutil al hacer hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-2xl scale-95 group-hover:scale-110 origin-left">{service.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-amber-400 transition-colors">{service.title}</h3>
                                <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-light">
                                    {service.desc}
                                </p>
                                <div className="pt-6 border-t border-zinc-800/80">
                                    <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">{service.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🕴️ TESTIMONIOS (Estilo Cita Oscura) */}
            <section className="py-24 bg-[#020202]/90 backdrop-blur-2xl relative z-20 border-t border-zinc-900/50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {MAGICIAN_DATA.testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                className="relative pl-8 border-l border-zinc-800 hover:border-purple-500/50 transition-colors duration-500"
                            >
                                <span className="absolute -top-4 -left-3 text-7xl text-zinc-800/50 font-serif leading-none select-none">"</span>
                                <p className="text-lg text-zinc-300 italic mb-6 relative z-10 font-light leading-relaxed">"{t.text}"</p>
                                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">— {t.author}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📞 FOOTER / CTA */}
            <footer className="py-24 border-t border-zinc-900 text-center relative overflow-hidden bg-[#050505]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-10 drop-shadow-2xl">¿Listo para dudar?</h2>

                    <div className="flex flex-col items-center gap-5 text-sm font-mono text-zinc-400">
                        <a href={`mailto:${MAGICIAN_DATA.contact.email}`} className="hover:text-amber-500 hover:scale-105 transition-all duration-300">
                            {MAGICIAN_DATA.contact.email}
                        </a>
                        <p className="hover:text-zinc-200 transition-colors">{MAGICIAN_DATA.contact.phone}</p>
                        <a href="#" className="mt-4 px-4 py-2 border border-zinc-800 rounded-full text-xs hover:border-purple-500/50 hover:text-purple-400 transition-all">
                            {MAGICIAN_DATA.contact.instagram}
                        </a>
                    </div>

                    <div className="mt-20 pt-8 border-t border-zinc-900/50 max-w-sm mx-auto">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                            Powered by <span className="font-black text-zinc-500 tracking-tight">CAZA Engine</span>
                        </p>
                    </div>
                </motion.div>
            </footer>
        </div>
    );
}