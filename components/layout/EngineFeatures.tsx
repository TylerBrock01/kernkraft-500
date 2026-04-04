'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function EngineFeatures() {
    // Configuración de la coreografía de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Retardo entre cada tarjeta (Efecto cascada)
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
    };

    // @ts-ignore
    return (
        <section className="relative w-full py-32 bg-zinc-950 px-6 overflow-hidden">
            {/* 🔮 Efecto de "Reactor" tipo MCU en el fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Cabecera Animada */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-20 text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-4">
                        Ingeniería de grado militar. <br className="hidden md:block" />
                        <span className="text-zinc-500">Diseñada para escalar.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        No usamos plantillas. Implementamos arquitecturas de software robustas
                        con aislamiento de datos, control de roles y monetización automatizada.
                    </p>
                </motion.div>

                {/* 🍱 EL BENTO BOX GRID ANIMADO */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }} // Se activa justo antes de entrar a la pantalla
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]"
                >

                    {/* Tarjeta 1: Multi-Tenant */}
                    <motion.div variants={itemVariants} className="md:col-span-2 relative group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-2xl font-bold text-zinc-100 mb-3">Aislamiento Multi-Tenant</h3>
                        <p className="text-zinc-400 max-w-md">
                            Cada negocio opera en su propio ecosistema. Un solo motor centralizado capaz de gestionar múltiples franquicias sin cruce de datos.
                        </p>
                        <div className="absolute bottom-[-20px] right-[-20px] w-64 h-64 border border-zinc-800 rounded-full opacity-30 flex items-center justify-center">
                            <div className="w-48 h-48 border border-zinc-700 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                        </div>
                    </motion.div>

                    {/* Tarjeta 2: RBAC Security */}
                    <motion.div variants={itemVariants} className="relative group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors flex flex-col justify-end">
                        <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            <div className="w-4 h-4 bg-zinc-400 rounded-sm"></div>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-100 mb-2">Control de Roles</h3>
                        <p className="text-zinc-500 text-sm">
                            Seguridad RBAC estricta. Accesos granulares desde Super Admin hasta Almacén.
                        </p>
                    </motion.div>

                    {/* Tarjeta 3: Pagos Automáticos */}
                    <motion.div variants={itemVariants} className="relative group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full"></div>
                        <h3 className="text-xl font-bold text-zinc-100 mb-2">Muros de Pago</h3>
                        <p className="text-zinc-500 text-sm">
                            Límites de inventario y caducidad de licencias programadas en el núcleo del sistema.
                        </p>
                    </motion.div>

                    {/* Tarjeta 4: Transacciones */}
                    <motion.div variants={itemVariants} className="md:col-span-2 relative group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors">
                        <div className="flex flex-col h-full justify-center">
                            <h3 className="text-2xl font-bold text-zinc-100 mb-3">Motor Transaccional</h3>
                            <p className="text-zinc-400 max-w-md">
                                Algoritmos financieros en tiempo real. Soporte para ventas, gestión de rentas con retorno, cortes de caja ciegos y control de inventario anti-overbooking.
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}