import React from 'react';
import Link from 'next/link';

interface ActiveRegisterDashboardProps {
    activeSession: any;
    movements: any[];
    onOpenMovementModal: () => void;
    onOpenCloseModal: () => void;
    onGoToTerminal: () => void;
}

export default function ActiveRegisterDashboard({ activeSession, movements, onOpenMovementModal, onOpenCloseModal, onGoToTerminal }: ActiveRegisterDashboardProps) {
    return (
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

                        <button onClick={onOpenMovementModal} className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-700 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors">
                            + Ingreso / Gasto
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-4">
                    <Link href={'/dashboard/pos/terminal'} onClick={onGoToTerminal} className="flex-1 py-4 bg-zinc-100 text-zinc-950 font-black uppercase tracking-widest text-xs text-center rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        🛒 Ir a la Terminal de Ventas
                    </Link>
                    <button onClick={onOpenCloseModal} className="px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        Hacer Corte de Caja
                    </button>
                </div>
            </div>

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
    );
}