'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

const CAZA_PLANS = [
    {
        name: "CRUX",
        subtitle: "Arquitectura Ligera",
        price: "$990",
        period: "/ mes",
        description: "Despliegue de presencia digital de alto rendimiento. Ideal para validación de mercado y captación B2C.",
        features: [
            "Diseño UI/UX Premium (Dark Mode/Light Mode)",
            "Infraestructura Edge (Tiempos de carga < 1s)",
            "Dominio corporativo y certificados SSL",
            "Enrutamiento directo a WhatsApp API",
            "Mantenimiento de servidores incluido"
        ],
        cta: "Desplegar CRUX",
        isPopular: false,
    },
    {
        name: "AERO",
        subtitle: "Motor Central",
        price: "$2,490",
        period: "/ mes",
        description: "Ecosistema operativo completo. Toma el control absoluto de tus ventas, inventario y flujo de efectivo.",
        features: [
            "Todo lo incluido en la licencia CRUX",
            "Terminal Punto de Venta (POS) en la nube",
            "Control de Arqueo y Cajas Registradoras",
            "Motor de Rentas y Control de Inventarios",
            "Base de Datos Cifrada de Clientes (CRM)",
            "Seguridad RBAC (Múltiples empleados)"
        ],
        cta: "Inicializar AERO",
        isPopular: true,
    },
    {
        name: "ZENITH",
        subtitle: "Infraestructura Enterprise",
        price: "A Medida",
        period: "",
        description: "Arquitectura diseñada para escalar sin fricción. Redes multi-sucursal y consultoría estratégica de software.",
        features: [
            "Despliegue Multi-Tenant Global",
            "Sincronización de múltiples sucursales",
            "Bases de datos aisladas y dedicadas",
            "Integración de Facturación Electrónica",
            "Auditoría técnica y de seguridad mensual",
            "Soporte SLA de Nivel 1"
        ],
        cta: "Solicitar Arquitectura",
        isPopular: false,
    }
];

export default function CazaPricing() {
    const [isAnnual, setIsAnnual] = useState(false);

    // Configuración de la coreografía (Idéntica a EngineFeatures)
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
    };

    return (
        <section className="relative w-full py-32 bg-zinc-950 px-6 overflow-hidden">
            {/* 🔮 Efecto de "Reactor" sutil (ADN de CAZA) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Cabecera Animada */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-20 text-center flex flex-col items-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-4">
                        Licenciamiento de Infraestructura.
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mb-10">
                        Escala tu operación sin preocuparte por los servidores. Selecciona la licencia que mejor se adapte a tu volumen de transacciones.
                    </p>

                    {/* Toggle Tech / Minimalista */}
                    <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-full border border-zinc-800 backdrop-blur-sm">
            <span className={`text-xs font-bold uppercase tracking-widest pl-4 transition-colors ${!isAnnual ? 'text-zinc-100' : 'text-zinc-600'}`}>
              Mensual
            </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-12 h-6 bg-zinc-950 rounded-full border border-zinc-700 transition-colors focus:outline-none"
                        >
                            <motion.div
                                animate={{ x: isAnnual ? 24 : 2 }}
                                className={`absolute top-[1px] w-5 h-5 rounded-full shadow-md transition-colors ${isAnnual ? 'bg-blue-500' : 'bg-zinc-500'}`}
                            />
                        </button>
                        <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 pr-2 transition-colors ${isAnnual ? 'text-zinc-100' : 'text-zinc-600'}`}>
              Anual <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">Ahorra 20%</span>
            </span>
                    </div>
                </motion.div>

                {/* 🍱 GRID DE LICENCIAS ANIMADO */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {CAZA_PLANS.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={itemVariants}
                            className={`relative group rounded-2xl border bg-zinc-900/40 p-8 overflow-hidden backdrop-blur-sm transition-all flex flex-col justify-between
                ${plan.isPopular
                                ? 'border-blue-500/30 hover:border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.05)]'
                                : 'border-zinc-800 hover:border-zinc-700'
                            }
              `}
                        >
                            {/* Brillo interno tipo cristal */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Etiqueta de Recomendado */}
                            {plan.isPopular && (
                                <div className="absolute top-0 right-8 bg-blue-500/10 border-b border-x border-blue-500/30 px-3 py-1.5 rounded-b-lg">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Licencia Recomendada</span>
                                </div>
                            )}

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-zinc-100 mb-1">{plan.name}</h3>
                                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">{plan.subtitle}</p>

                                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-zinc-100 tracking-tighter">
                    {isAnnual && plan.price !== "A Medida" ? `$${(parseInt(plan.price.replace('$','').replace(',','')) * 0.8).toLocaleString()}` : plan.price}
                  </span>
                                    <span className="text-sm text-zinc-500 font-mono">{plan.period}</span>
                                </div>

                                <p className="text-sm text-zinc-400 mb-8 leading-relaxed h-16">
                                    {plan.description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                                            </div>
                                            <span className="text-sm text-zinc-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className={`relative z-10 w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300
                ${plan.isPopular
                                ? 'bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                            }
              `}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}