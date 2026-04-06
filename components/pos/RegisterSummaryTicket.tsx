import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RegisterSummaryTicketProps {
    closeSummary: any;
    onClose: () => void;
}

export default function RegisterSummaryTicket({ closeSummary, onClose }: RegisterSummaryTicketProps) {
    return (
        <AnimatePresence>
            {closeSummary && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Corte de Caja Exitoso</h2>
                            <p className="text-sm text-zinc-500 font-mono">{closeSummary.message}</p>
                        </div>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
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
                            ${closeSummary.summary.salesRevenue.toFixed(2)}
                        </div>

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
    );
}