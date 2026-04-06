'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import CashMovementModal from "@/components/pos/CashMovementModal";
import Link from "next/link";

export default function POSTerminalPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeSession, setActiveSession] = useState<any>(null);
    const [movements, setMovements] = useState<any[]>([]);
    const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);

    // Estados para Abrir Caja
    const [openingBalance, setOpeningBalance] = useState('');
    const [isOpening, setIsOpening] = useState(false);

    // Estados para Cerrar Caja (Corte)
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [actualBalance, setActualBalance] = useState('');
    const [closeNotes, setCloseNotes] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    // Estado para el Recibo Final (Resumen del Corte)
    const [closeSummary, setCloseSummary] = useState<any>(null);

    // 1. VERIFICAR ESTADO AL CARGAR
    const checkSession = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/cash-registers/current');
            setActiveSession(response.data);

            // 🚀 Si la caja está abierta, traemos la bitácora del turno
            if (response.data) {
                fetchMyMovements();
            }
        } catch (error) {
            console.error('Error verificando la caja:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchMyMovements = async () => {
        try {
            const res = await api.get('/cash-movements/my-shift');
            setMovements(res.data);
        } catch (error) {
            console.error('Error obteniendo movimientos:', error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    // 2. ABRIR TURNO
    const handleOpenRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpening(true);
        const toastId = toast.loading('Inicializando bóveda...');

        try {
            const response = await api.post('/cash-registers/open', {
                openingBalance: Number(openingBalance)
            });
            toast.success(response.data.message || 'Turno iniciado', { id: toastId });
            setOpeningBalance('');
            checkSession(); // Recargamos para mostrar la Cara B
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al abrir caja', { id: toastId });
        } finally {
            setIsOpening(false);
        }
    };

    // 3. CERRAR TURNO (ARQUEO)
    const handleCloseRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsClosing(true);
        const toastId = toast.loading('Procesando arqueo de caja...');

        try {
            const response = await api.post('/cash-registers/close', {
                actualBalance: Number(actualBalance),
                notes: closeNotes
            });

            toast.success('Corte finalizado exitosamente', { id: toastId });
            setCloseSummary(response.data); // Guardamos el resumen para mostrar el "Ticket"
            setIsCloseModalOpen(false);
            setActiveSession(null); // La caja vuelve a estar cerrada
            setActualBalance('');
            setCloseNotes('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al cerrar caja', { id: toastId });
        } finally {
            setIsClosing(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest animate-pulse">Sincronizando terminal...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col pt-8">

            {/* 🧾 TICKET DE CORTE FINAL (Si acabamos de cerrar) */}
            <AnimatePresence>
                {closeSummary && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Corte de Caja Exitoso</h2>
                                <p className="text-sm text-zinc-500 font-mono">{closeSummary.message}</p>
                            </div>
                            <button onClick={() => setCloseSummary(null)} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <div className={`p-4 rounded-lg mb-6 text-center border font-black tracking-widest text-lg ${
                            closeSummary.summary.difference === 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                closeSummary.summary.difference > 0 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                            {closeSummary.diagnosis}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm font-mono bg-black/50 p-4 rounded-lg border border-zinc-800/50">
                            <div className="text-zinc-500">Fondo Inicial:</div>
                            <div className="text-right text-zinc-300">${closeSummary.summary.openingBalance.toFixed(2)}</div>

                            <div className="text-zinc-500">Ventas en Efectivo:</div>
                            <div className={`text-right ${closeSummary.summary.salesRevenue > 0 ? 'text-emerald-400' : closeSummary.summary.salesRevenue < 0
                                ? 'text-red-500'
                                : 'text-gray-400'}` }>
                                {closeSummary.summary.salesRevenue > 0 ? '+' : ''}
                                ${closeSummary.summary.salesRevenue.toFixed(2)}</div>

                            <div className="text-zinc-500">Dinero Esperado:</div>
                            <div className="text-right font-bold text-yellow-500 border-t border-zinc-700 pt-2">${closeSummary.summary.expectedBalance.toFixed(2)}</div>

                            <div className="text-zinc-500">Efectivo Físico Contado:</div>
                            <div className="text-right font-bold text-white">${closeSummary.summary.actualBalance.toFixed(2)}</div>

                            <div className="text-zinc-500 mt-2">Diferencia:</div>
                            <div className={`text-right font-black mt-2 ${closeSummary.summary.difference < 0 ? 'text-red-500' : 'text-zinc-300'}`}>
                                {closeSummary.summary.difference > 0 ? '+' : ''}
                                ${closeSummary.summary.difference.toFixed(2)}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Terminal POS</h1>
                    <p className="text-zinc-500 text-sm mt-1">Punto de venta y control de flujo de efectivo</p>
                </div>

                {/* Indicador de Estado Táctico */}
                <div className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold border flex items-center gap-2 ${
                    activeSession ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                    <div className={`w-2 h-2 rounded-full ${activeSession ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {activeSession ? 'Caja Abierta' : 'Caja Cerrada'}
                </div>
            </div>

            {/* =========================================
          CARA A: CAJA CERRADA (Formulario de Apertura)
          ========================================= */}
            {!activeSession ? (
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full backdrop-blur-md">
                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner border border-zinc-700">🔒</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Apertura de Turno</h2>
                    <p className="text-zinc-500 text-sm mb-8">Ingresa el fondo de caja (morralla) para habilitar el punto de venta y comenzar a procesar transacciones.</p>

                    <form onSubmit={handleOpenRegister} className="w-full space-y-6">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-xl">$</span>
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0"
                                value={openingBalance}
                                onChange={(e) => setOpeningBalance(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 text-2xl rounded-xl pl-10 pr-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        <button type="submit" disabled={isOpening} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50">
                            {isOpening ? 'Desbloqueando...' : 'Iniciar Turno Operativo'}
                        </button>
                    </form>
                </div>
            ) : (
                /* =========================================
                   CARA B: CAJA ABIERTA (Panel de Control)
                   ========================================= */
                <div className="space-y-6">
                    <div className="bg-zinc-900/40 border border-emerald-900/30 rounded-2xl p-8 backdrop-blur-md">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">ID de Sesión: <span className="text-zinc-400 font-mono">{activeSession.id}</span></p>
                                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Turno Activo</h2>
                                <p className="text-sm text-zinc-400">Abierto el: {new Date(activeSession.openedAt).toLocaleString()}</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Fondo Base</p>
                                <p className="text-3xl font-mono font-black text-emerald-400">${Number(activeSession.openingBalance).toFixed(2)}</p>

                                {/* 🚀 BOTÓN PARA REGISTRAR MOVIMIENTO */}
                                <button onClick={() => setIsMovementModalOpen(true)} className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-700 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors">
                                    + Ingreso / Gasto
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-4">
                            <Link href={'/dashboard/pos/terminal'} onClick={() => toast('El POS se construirá pronto', { icon: '🚧' })} className="flex-1 py-4 bg-zinc-100 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                🛒 Ir a la Terminal de Ventas
                            </Link>
                            <button onClick={() => setIsCloseModalOpen(true)} className="px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                Hacer Corte de Caja
                            </button>
                        </div>
                    </div>

                    {/* 🧾 BITÁCORA DEL TURNO (Solo visible si hay movimientos) */}
                    {movements.length > 0 && (
                        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Bitácora de Movimientos del Turno</h3>
                            <div className="space-y-2">
                                {movements.map(mov => (
                                    <div key={mov.id} className="flex justify-between items-center bg-zinc-950/50 border border-zinc-800/50 p-3 rounded-lg">
                                        <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full ${mov.type === 'IN' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-500'}`}>
                        {mov.type === 'IN' ? '↓' : '↑'}
                      </span>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-200">{mov.reason}</p>
                                                <p className="text-[10px] font-mono text-zinc-500">{new Date(mov.date).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                        <span className={`font-mono font-bold ${mov.type === 'IN' ? 'text-blue-400' : 'text-red-500'}`}>
                      {mov.type === 'IN' ? '+' : '-'}${Number(mov.amount).toFixed(2)}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 🚨 MODAL DE ARQUEO (Corte de Caja) */}
            <AnimatePresence>
                {isCloseModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isClosing && setIsCloseModalOpen(false)} />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-8 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-2">Corte de Caja</h3>
                            <p className="text-sm text-zinc-500 mb-8">Cuenta el dinero físico que hay actualmente en el cajón y regístralo a continuación para realizar el cuadre del sistema.</p>

                            <form onSubmit={handleCloseRegister} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Efectivo Físico Contado</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xl">$</span>
                                        <input required type="number" step="0.01" min="0" value={actualBalance} onChange={(e) => setActualBalance(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white text-2xl rounded-xl pl-10 pr-4 py-3 outline-none focus:border-red-500 font-mono transition-colors" placeholder="0.00" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Observaciones (Opcional)</label>
                                    <textarea value={closeNotes} onChange={(e) => setCloseNotes(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500 resize-none h-24" placeholder="Ej. Faltan 10 pesos que se usaron para garrafones de agua..." />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-zinc-800">
                                    <button type="button" onClick={() => setIsCloseModalOpen(false)} disabled={isClosing} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                                        Cancelar
                                    </button>
                                    <button type="submit" disabled={isClosing} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all disabled:opacity-50">
                                        {isClosing ? 'Calculando...' : 'Sellar Caja'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <CashMovementModal isOpen={isMovementModalOpen} onClose={() => setIsMovementModalOpen(false)} onSuccess={fetchMyMovements} />
        </div>
    );
}