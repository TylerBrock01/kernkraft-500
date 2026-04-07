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
        <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-amber-500/30">

            {/* 🔮 HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
                {/* Efectos de luz misteriosa */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-20 text-center max-w-4xl mx-auto"
                >
                    <p className="text-amber-500/80 font-mono text-xs md:text-sm uppercase tracking-[0.5em] mb-6">
                        {MAGICIAN_DATA.title}
                    </p>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
                        {MAGICIAN_DATA.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light italic mb-12">
                        "{MAGICIAN_DATA.tagline}"
                    </p>

                    <button className="px-8 py-4 bg-transparent border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        Agendar un Espectáculo
                    </button>
                </motion.div>
            </section>

            {/* 🃏 BIOGRAFÍA BREVE */}
            <section className="py-20 px-6 md:px-12 bg-zinc-950 border-y border-zinc-900">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-3xl mb-4 block">👁️</span>
                    <h2 className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest mb-6">El Artista</h2>
                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-serif">
                        {MAGICIAN_DATA.about}
                    </p>
                </div>
            </section>

            {/* 🎩 SERVICIOS */}
            <section className="py-24 px-4 md:px-12 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight text-center mb-16">
                        Experiencias
                        <span className="block text-xs font-mono text-amber-500 tracking-[0.3em] mt-3 font-normal">Formatos Disponibles</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MAGICIAN_DATA.services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-zinc-900/30 border border-zinc-800 p-8 hover:border-purple-500/50 transition-colors group relative overflow-hidden"
                            >
                                {/* Brillo sutil al hacer hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{service.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                    {service.desc}
                                </p>
                                <div className="pt-4 border-t border-zinc-800">
                                    <p className="text-xs font-mono text-amber-500 uppercase tracking-widest">{service.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🕴️ TESTIMONIOS (Estilo Cita Oscura) */}
            <section className="py-24 bg-[#020202]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {MAGICIAN_DATA.testimonials.map((t, idx) => (
                            <div key={idx} className="relative">
                                <span className="absolute -top-6 -left-4 text-6xl text-zinc-800 font-serif leading-none">"</span>
                                <p className="text-zinc-300 italic mb-4 relative z-10">{t.text}</p>
                                <p className="text-xs font-bold text-amber-500/70 uppercase tracking-widest">— {t.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📞 FOOTER / CTA */}
            <footer className="py-20 border-t border-zinc-900 text-center relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-amber-900/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8">¿Listo para creer?</h2>

                    <div className="flex flex-col items-center gap-4 text-sm font-mono text-zinc-400">
                        <a href={`mailto:${MAGICIAN_DATA.contact.email}`} className="hover:text-amber-500 transition-colors">
                            {MAGICIAN_DATA.contact.email}
                        </a>
                        <p>{MAGICIAN_DATA.contact.phone}</p>
                        <p className="mt-4">{MAGICIAN_DATA.contact.instagram}</p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-zinc-900/50 max-w-sm mx-auto">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                            Powered by <span className="font-bold text-zinc-500">CAZA Engine</span>
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}