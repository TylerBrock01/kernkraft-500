import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CloseRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    actualBalance: string;
    setActualBalance: (val: string) => void;
    closeNotes: string;
    setCloseNotes: (val: string) => void;
    handleCloseRegister: (e: React.FormEvent) => void;
    isClosing: boolean;
}

export default function CloseRegisterModal({ isOpen, onClose, actualBalance, setActualBalance, closeNotes, setCloseNotes, handleCloseRegister, isClosing }: CloseRegisterModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isClosing && onClose()} />
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
                                <button type="button" onClick={onClose} disabled={isClosing} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
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
    );
}