'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

// -------------------------------------------------------------
// INTERFACES (Contrato de Datos)
// -------------------------------------------------------------
interface User {
    id: number;
    email: string;
}

interface CashMovement {
    id: number;
    amount: number | string;
    type: 'IN' | 'OUT';
    reason: string;
    date: string;
    user: User;
}

type FilterType = 'ALL' | 'IN' | 'OUT';

export default function CashMovementsLedger() {
    // -------------------------------------------------------------
    // ESTADO DEL MOTOR
    // -------------------------------------------------------------
    const [movements, setMovements] = useState<CashMovement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [meta, setMeta] = useState({ total: 0, page: 1, lastPage: 1 });
    const [filter, setFilter] = useState<FilterType>('ALL');

    // Estados para Filtros
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // -------------------------------------------------------------
    // CONEXIÓN CON EL BACKEND
    // -------------------------------------------------------------
    const fetchMovements = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
            });
            const response = await api.get(`/cash-movements?${params}`);
            setMovements(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            toast.error('Error al sincronizar datos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovements();
    }, [currentPage, startDate, endDate]);
    // -------------------------------------------------------------
    // MATEMÁTICAS EN TIEMPO REAL (Memoizadas para rendimiento)
    // -------------------------------------------------------------
    const { totalIn, totalOut, netBalance } = useMemo(() => {
        let inSum = 0;
        let outSum = 0;

        movements.forEach(mov => {
            const amount = Number(mov.amount);
            if (mov.type === 'IN') inSum += amount;
            if (mov.type === 'OUT') outSum += amount;
        });

        return {
            totalIn: inSum,
            totalOut: outSum,
            netBalance: inSum - outSum
        };
    }, [movements]);

    // Filtrado dinámico
    const filteredMovements = movements.filter(mov => filter === 'ALL' || mov.type === filter);

    // -------------------------------------------------------------
    // COREOGRAFÍA UI (Animaciones MCU)
    // -------------------------------------------------------------
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="w-16 h-16 border border-zinc-700 rounded-full border-dashed animate-[spin_3s_linear_infinite] flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 font-sans selection:bg-blue-500/30">

            {/* 🔮 Efecto Reactor de Fondo */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            {/* 📋 HEADER & METRICS */}
            <header className="mb-12">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Libro Mayor</h1>
                <p className="text-zinc-500 text-sm font-medium mb-8">Auditoría de Inyecciones y Fugas de Capital</p>

                {/* Grid de Resumen Financiero */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tarjeta: Entradas */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[30px] rounded-full"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Total Entradas
                        </span>
                        <span className="text-3xl font-mono font-black text-emerald-400">${totalIn.toFixed(2)}</span>
                    </motion.div>

                    {/* Tarjeta: Salidas */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-[30px] rounded-full"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Total Salidas
                        </span>
                        <span className="text-3xl font-mono font-black text-red-500">${totalOut.toFixed(2)}</span>
                    </motion.div>

                    {/* Tarjeta: Flujo Neto */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col relative">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Flujo Neto</span>
                        <span className={`text-3xl font-mono font-black ${netBalance >= 0 ? 'text-blue-400' : 'text-amber-500'}`}>
                            {netBalance > 0 ? '+' : ''}${netBalance.toFixed(2)}
                        </span>
                    </motion.div>
                </div>
            </header>
            {/* 🛠️ PANEL DE FILTROS TÉCNICO (Estilo Apple Dark) */}
            <div className="grid grid-cols-1 md:flex items-end gap-4 mb-8 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 backdrop-blur-md">
                <div className="flex-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Rango de Auditoría</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
                            className="bg-zinc-950 border border-zinc-800 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors text-zinc-300"
                        />
                        <span className="text-zinc-700">/</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
                            className="bg-zinc-950 border border-zinc-800 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors text-zinc-300"
                        />
                    </div>
                </div>

                <button
                    onClick={() => { setStartDate(''); setEndDate(''); setCurrentPage(1); }}
                    className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors"
                >
                    Limpiar Filtros
                </button>
            </div>
            {/* 🎛️ CONTROLES TÁCTICOS */}
            <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
                <div className="flex gap-2 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 backdrop-blur-sm">
                    {(['ALL', 'IN', 'OUT'] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${
                                filter === f
                                    ? f === 'IN' ? 'bg-emerald-500/20 text-emerald-400'
                                        : f === 'OUT' ? 'bg-red-500/20 text-red-500'
                                            : 'bg-zinc-800 text-white'
                                    : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            {f === 'ALL' ? 'Todos' : f === 'IN' ? 'Entradas' : 'Salidas'}
                        </button>
                    ))}
                </div>

                <span className="text-xs font-mono text-zinc-500">{filteredMovements.length} Registros</span>
            </div>

            {/* 📊 GRID DE REGISTROS */}
            {filteredMovements.length === 0 ? (
                <div className="py-20 text-center border border-zinc-800/50 border-dashed rounded-2xl bg-zinc-900/20">
                    <span className="text-4xl mb-4 block opacity-50">📂</span>
                    <p className="text-zinc-500 text-sm font-medium">No hay movimientos registrados en esta vista.</p>
                </div>
            ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
                    <AnimatePresence>
                        {filteredMovements.map((mov) => (
                            <motion.div
                                key={mov.id}
                                // variants={itemVariants}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 p-4 rounded-xl transition-colors gap-4"
                            >
                                {/* Lado Izquierdo: Icono + Razón + Usuario */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                                        mov.type === 'IN'
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                            : 'bg-red-500/10 border-red-500/20 text-red-500'
                                    }`}>
                                        {/* Iconos estilo técnico */}
                                        {mov.type === 'IN' ? '↓' : '↑'}
                                    </div>

                                    <div>
                                        <p className="text-zinc-200 font-medium text-sm mb-0.5">{mov.reason}</p>
                                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-zinc-600">
                                            <span>{new Date(mov.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}</span>
                                            <span>•</span>
                                            <span className="group-hover:text-blue-400 transition-colors truncate max-w-[150px]">{mov.user.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lado Derecho: Monto */}
                                <div className="sm:text-right shrink-0">
                                    <p className={`font-mono font-black text-lg ${
                                        mov.type === 'IN' ? 'text-emerald-400' : 'text-red-500'
                                    }`}>
                                        {mov.type === 'IN' ? '+' : '-'}${Number(mov.amount).toFixed(2)}
                                    </p>
                                    <p className="text-[9px] font-mono text-zinc-600 uppercase">ID: {String(mov.id).padStart(6, '0')}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
            {/* 📑 PAGINACIÓN (Controles de Navegación) */}
            <div className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-6">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    Mostrando página {meta.page} de {meta.lastPage} ({meta.total} registros)
                </p>

                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-800 transition-colors"
                    >
                        Anterior
                    </button>
                    <button
                        disabled={currentPage === meta.lastPage}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-4 py-2 bg-zinc-100 text-zinc-950 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:bg-white transition-colors"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}