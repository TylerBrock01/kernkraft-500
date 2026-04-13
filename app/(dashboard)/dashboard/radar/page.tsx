'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ⚠️ Asegúrate de importar tu instancia de axios autenticada (la que manda el Bearer token)
import { api } from '@/app/lib/axios/axios';
import toast from "react-hot-toast";
import Link from "next/link";

export default function RadarPage() {
    // 🛡️ OBTENER LA FECHA LOCAL EXACTA (Sin importar la hora)
    const getLocalToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Siempre devuelve "YYYY-MM-DD" local
    };

    // 1. ESTADO DEL SISTEMA
    const [targetDate, setTargetDate] = useState(getLocalToday());
    // 1. ESTADO DEL SISTEMA
    // Inicializamos la fecha en HOY (formato YYYY-MM-DD)
    const [radarData, setRadarData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. MOTOR DE EXTRACCIÓN (Fetch API)
    const fetchRadarData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Llamamos a tu controlador reciclado usando returnDate
            const response = await api.get(`/transactions/returnDate?date=${targetDate}`);
            setRadarData(response.data);
        } catch (err: any) {
            console.error('Error cargando el radar:', err);
            setError('Interferencia en la señal. No se pudo cargar el radar logístico.');
        } finally {
            console.log('Radar cargado:', radarData);
            setIsLoading(false);
        }
    }, [targetDate]);

    // Disparar la búsqueda cuando cambie la fecha
    useEffect(() => {
        fetchRadarData();
    }, [fetchRadarData]);

    // 3. 🧠 EL CEREBRO DEL FRONTEND (Clasificación en tiempo real)
    // Filtramos y calculamos basándonos en la respuesta cruda del backend
    const pickups = radarData?.missions?.pickups || [];
    const returns = radarData?.missions?.returns || [];
    const metrics = radarData?.metrics || {
        totalOperations: 0,
        pendingReturns: 0,
        pendingPickups: 0,
        depositRisk: 0
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans text-zinc-100 selection:bg-blue-500/30 min-h-screen">

            {/* 🎛️ CABECERA TÁCTICA */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${isLoading ? 'bg-amber-500 text-amber-500' : 'bg-emerald-500 text-emerald-500'}`}></div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Radar Logístico</h1>
                    </div>
                    <p className="text-zinc-500 text-sm font-medium tracking-wide">
                        Control de tráfico de inventario y riesgo de capital.
                    </p>
                </div>

                {/* Selector de Fecha */}
                <div className="flex items-center bg-zinc-900/50 border border-zinc-800 rounded-xl p-2 backdrop-blur-sm">
                    <span className="text-xs uppercase font-bold tracking-widest text-zinc-500 px-3">Objetivo:</span>
                    <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="bg-transparent border-none text-zinc-100 font-mono text-sm outline-none focus:ring-0 cursor-pointer"
                    />
                </div>
            </header>

            {/* Manejo de Errores de Red */}
            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-mono">
                    {error}
                </div>
            )}

            {/* 📊 PANEL DE MÉTRICAS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <MetricCard label="Misiones de Hoy" value={isLoading ? '--' : metrics.totalOperations} icon="🎯" />
                <MetricCard label="Entregas (Pickups)" value={isLoading ? '--' : metrics.pendingPickups} color="amber" />
                <MetricCard label="Retornos Esperados" value={isLoading ? '--' : metrics.pendingReturns} color="blue" />
                <MetricCard
                    label="Riesgo de Depósitos"
                    value={isLoading ? '--' : `$${Number(metrics.depositRisk).toFixed(2)}`}
                    color="emerald"
                    alert="Efectivo Requerido"
                />
            </div>

            {/* 🗺️ PANTALLA DIVIDIDA: PICKUPS vs RETURNS */}
            <div className="grid md:grid-cols-2 gap-8 relative">

                {/* Capa de Carga Superpuesta */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10 bg-zinc-950/50 backdrop-blur-[2px] flex justify-center pt-20 rounded-xl"
                        >
                            <div className="w-8 h-8 border-2 border-zinc-600 border-t-blue-500 rounded-full animate-spin"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* COLUMNA IZQUIERDA: Entregas / Ventas (Pickups) */}
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 border-b border-amber-500/20 pb-3 mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                        Preparar para Entrega
                    </h2>
                    <div className="space-y-4">
                        {pickups.map((tx: any) => (
                            <MissionCard key={tx.id} transaction={tx} theme="amber" onResolveSuccess={fetchRadarData}/>
                        ))}
                        {!isLoading && pickups.length === 0 && <EmptyRadar message="No hay entregas programadas." />}
                    </div>
                </section>

                {/* COLUMNA DERECHA: Devoluciones de Renta (Returns) */}
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 border-b border-blue-400/20 pb-3 mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        Esperando Retorno
                    </h2>
                    <div className="space-y-4">
                        {returns.map((tx :any) => (
                            <MissionCard key={tx.id} transaction={tx} theme="blue" onResolveSuccess={fetchRadarData} />
                        ))}
                        {!isLoading && returns.length === 0 && <EmptyRadar message="No hay retornos pendientes." />}
                    </div>
                </section>

            </div>
        </div>
    );
}

// -------------------------------------------------------------
// 🧩 SUB-COMPONENTES UI
// -------------------------------------------------------------

function MetricCard({ label, value, color = 'zinc', icon = '', alert = '' }: any) {
    const colorMap: any = {
        zinc: 'text-zinc-100',
        amber: 'text-amber-400',
        blue: 'text-blue-400',
        emerald: 'text-emerald-400'
    };
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            {alert && <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[8px] font-black uppercase px-2 py-1 tracking-widest rounded-bl-lg">{alert}</div>}
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{label}</p>
            <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black font-mono tracking-tight ${colorMap[color]}`}>{value}</span>
                {icon && <span className="text-xl opacity-50">{icon}</span>}
            </div>
        </div>
    );
}

function MissionCard({ transaction, theme,onResolveSuccess }: any) {
    const isReturn = theme === 'blue';

    // Validamos si returnDate existe, si no, mostramos '--:--'
    const hour = transaction.returnDate
        ? new Date(transaction.returnDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '--:--';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`bg-zinc-950 border rounded-xl overflow-hidden ${isReturn ? 'border-blue-900/30' : 'border-amber-900/30'} hover:border-zinc-600 transition-all`}
        >
            {/* Header de la Tarjeta */}
            <div className={`px-4 py-2 flex justify-between items-center border-b ${isReturn ? 'bg-blue-950/20 border-blue-900/20' : 'bg-amber-950/20 border-amber-900/20'}`}>
                <span className="font-mono text-sm font-black text-zinc-300">{hour}</span>

                {/* Badge de estado logístico */}
                <div className="flex gap-2">
                    {transaction.rentalStatus === 'LATE' && (
                        <span className="bg-red-500/20 border border-red-500/50 text-red-400 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">Retrasado</span>
                    )}
                    {transaction.status === 'PAID' && !isReturn && (
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Pagado</span>
                    )}
                </div>

                <span className="text-[9px] font-mono text-zinc-500">ID:{ transaction.id}</span>
            </div>

            {/* Cuerpo de la Tarjeta */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-zinc-100 text-lg leading-none mb-1">
                            {transaction.customer?.name || 'Venta al Mostrador'}
                        </h3>
                        {transaction.customer?.phone && (
                            <p className="text-xs text-zinc-500 font-mono">📞 {transaction.customer.phone}</p>
                        )}
                    </div>
                    {isReturn && Number(transaction.depositAmount) > 0 && (
                        <div className="text-right">
                            <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Depósito Retenido</p>
                            <p className="font-mono font-bold text-emerald-400">${Number(transaction.depositAmount).toFixed(2)}</p>
                        </div>
                    )}
                </div>

                {/* Lista de Empaque mapeada desde relations: ['contents', 'contents.product'] */}
                <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800/50">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                        {isReturn ? 'Equipo a Revisar:' : 'Preparar Paquete:'}
                    </p>
                    <ul className="space-y-1">
                        {transaction.contents?.map((content: any, idx: number) => (
                            <li key={idx} className="text-sm text-zinc-300 flex justify-between items-center">
                                <span><span className="text-zinc-600 mr-2">-</span>{content.product?.name || 'Producto Desconocido'}</span>
                                <span className="font-mono text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">x{content.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Botones Tácticos */}
                <Link href={`/dashboard/transactions/${transaction.id}`}>
                    <div className={`mt-4 w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-center transition-colors border cursor-pointer ${
                        isReturn
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500 hover:text-white'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500 hover:text-white'
                    }`}>
                        {isReturn ? 'Ver Retorno' : 'Ver Pick-Up'}
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}

function EmptyRadar({ message }: { message: string }) {
    return (
        <div className="h-32 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-sm font-mono">
            {message}
        </div>
    );
}