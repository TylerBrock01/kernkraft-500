'use client';

import React from 'react';
import { motion } from 'framer-motion';

// -------------------------------------------------------------
// 🗄️ BASE DE DATOS DE ACTUALIZACIONES (Mockup)
// -------------------------------------------------------------
type UpdateType = 'FEATURE' | 'SECURITY' | 'FIX' | 'SYSTEM';

interface SystemUpdate {
    id: string;
    version: string;
    date: string;
    type: UpdateType;
    title: string;
    description: string;
    highlights: string[];
}

const SYSTEM_UPDATES: SystemUpdate[] = [
    {
        id: 'upd-004',
        version: 'v2.4.0',
        date: '08 ABR 2026',
        type: 'FEATURE',
        title: 'Control de Bóveda y Libro Mayor',
        description: 'Hemos desplegado el nuevo ecosistema financiero. Ahora puedes auditar cada centavo que entra o sale de tus sucursales con precisión matemática.',
        highlights: [
            'Nuevo panel de movimientos (Inyecciones y Fugas de capital).',
            'Filtros de auditoría por rangos de fechas exactos.',
            'Prevención de doble apertura de caja por el mismo usuario.'
        ]
    },
    {
        id: 'upd-003',
        version: 'v2.3.5',
        date: '05 ABR 2026',
        type: 'SECURITY',
        title: 'Aislamiento Multi-Tenant (Headless)',
        description: 'Reescribimos el motor del catálogo público. Las peticiones de tus clientes ahora están 100% aisladas del panel administrativo, mejorando la seguridad y velocidad de carga.',
        highlights: [
            'Rutas dinámicas asíncronas para catálogos públicos.',
            'Buscador integrado con tecnología Anti-Rebote (Debounce).',
            'Pantalla táctica de "Señal Perdida" para enlaces rotos.'
        ]
    },
    {
        id: 'upd-002',
        version: 'v2.2.1',
        date: '02 ABR 2026',
        type: 'FIX',
        title: 'Sincronización de Inventarios',
        description: 'Se resolvió un escenario donde los carritos mixtos (Venta + Renta) no descontaban correctamente el inventario en milisegundos.',
        highlights: [
            'Motor transaccional optimizado.',
            'Los productos con stock cero ahora se ocultan automáticamente del catálogo.'
        ]
    },
    {
        id: 'upd-001',
        version: 'v2.0.0',
        date: '15 MAR 2026',
        type: 'SYSTEM',
        title: 'Lanzamiento del Motor CAZA',
        description: 'Inicialización de la arquitectura base. El sistema operativo para negocios físicos y digitales está en línea.',
        highlights: [
            'Terminal POS de alto rendimiento.',
            'Gestión de roles (RBAC) y control de empleados.',
            'Diseño en Modo Oscuro de grado militar.'
        ]
    }
];

// -------------------------------------------------------------
// 🎨 DICCIONARIO DE ESTILOS POR TIPO DE ACTUALIZACIÓN
// -------------------------------------------------------------
const typeConfig = {
    FEATURE: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500', label: 'Nueva Función' },
    SECURITY: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500', label: 'Seguridad' },
    FIX: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500', label: 'Corrección' },
    SYSTEM: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500', label: 'Sistema Base' },
};

export default function DashboardHome() {
    // Animaciones de cascada
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-6 font-sans text-zinc-100 selection:bg-zinc-800">

            {/* 🔮 Efecto Reactor Sutil */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            {/* 📋 HEADER DE LA BITÁCORA */}
            <header className="mb-16 border-b border-zinc-800 pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                        <span className="text-xl">📡</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white">Transmisiones del Motor</h1>
                        <p className="text-zinc-500 text-sm font-medium">Bitácora de mejoras, parches de seguridad y expansiones de CAZA.</p>
                    </div>
                </div>

                {/* Banner de Estado del Sistema */}
                <div className="mt-8 inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            Todos los sistemas operando al 100%
          </span>
                </div>
            </header>

            {/* ⏳ TIMELINE DE ACTUALIZACIONES */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative border-l border-zinc-800 ml-4 md:ml-6 space-y-16"
            >
                {SYSTEM_UPDATES.map((update, index) => {
                    const style = typeConfig[update.type];
                    const isLatest = index === 0;

                    return (
                        <motion.div key={update.id} className="relative pl-8 md:pl-12">

                            {/* Nodo del Timeline (El punto en la línea) */}
                            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${style.dot} ring-4 ring-zinc-950 shadow-[0_0_10px_currentColor]`} style={{ color: style.dot.replace('bg-', '') }}></div>

                            {/* Pulso animado para la actualización más reciente */}
                            {isLatest && (
                                <div className={`absolute -left-[9px] top-0.5 w-4.5 h-4.5 rounded-full ${style.bg} animate-ping`}></div>
                            )}

                            {/* Contenido de la Tarjeta */}
                            <div className={`bg-zinc-900/40 backdrop-blur-sm border ${isLatest ? 'border-zinc-700' : 'border-zinc-800'} rounded-2xl p-6 md:p-8 hover:bg-zinc-900/60 transition-colors`}>

                                {/* Metadatos (Fecha, Versión, Tipo) */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${style.bg} ${style.border} ${style.color}`}>
                    {style.label}
                  </span>
                                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    VER {update.version}
                  </span>
                                    <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest hidden sm:inline">|</span>
                                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    {update.date}
                  </span>
                                    {isLatest && (
                                        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded text-zinc-100 animate-pulse">
                      Última Versión
                    </span>
                                    )}
                                </div>

                                {/* Título y Descripción */}
                                <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
                                    {update.title}
                                </h2>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-3xl">
                                    {update.description}
                                </p>

                                {/* Puntos Clave (Highlights) */}
                                <div className="space-y-3 bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">
                                        Despliegue Técnico:
                                    </h3>
                                    <ul className="space-y-2">
                                        {update.highlights.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                                <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${style.dot} opacity-70`}></span>
                                                <span className="leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

        </div>
    );
}