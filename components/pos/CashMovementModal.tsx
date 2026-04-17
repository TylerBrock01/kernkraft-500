import React, {useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

interface CashMovementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CashMovementModal({ isOpen, onClose, onSuccess }: CashMovementModalProps) {
    const [type, setType] = useState<'IN' | 'OUT'>('OUT');
    const [category, setCategory] = useState('OPERATING_EXPENSE');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (type === 'IN') {
            setCategory('OTHER');
        } else if (type === 'OUT' && category === 'OTHER') {
            // Si regresa a SALIDA, le ponemos el gasto por defecto para agilizar
            setCategory('OPERATING_EXPENSE');
        }
    }, [type]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Registrando movimiento...');

        try {
            // ⚠️ Ajusta la ruta '/cash-movement' al prefijo real de tu controlador NestJS
            await api.post('/cash-movements', {
                type,
                category, // Ya va sincronizado y validado
                amount: Number(amount),
                reason
            });

            toast.success('Flujo de caja registrado', { id: toastId });
            setAmount('');
            setReason('');
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al registrar', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isLoading && onClose()} />
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="relative bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Movimiento de Caja</h3>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* TIPO DE MOVIMIENTO (Radio Buttons Tácticos) */}
                            <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                                <button type="button" onClick={() => setType('OUT')} className={`flex-1 py-2 text-[10px] uppercase font-bold tracking-widest rounded-md transition-all ${type === 'OUT' ? 'bg-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                    Salida / Gasto
                                </button>
                                <button type="button" onClick={() => setType('IN')} className={`flex-1 py-2 text-[10px] uppercase font-bold tracking-widest rounded-md transition-all ${type === 'IN' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                    Entrada Extra
                                </button>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Monto ($)</label>
                                <input required type="number" step="0.01" min="0.1" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white text-lg rounded-xl px-4 py-3 outline-none focus:border-zinc-600 font-mono" placeholder="0.00" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Motivo / Concepto</label>
                                <textarea required value={reason} onChange={(e) => setReason(e.target.value)} rows={2} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-xl px-4 py-3 outline-none focus:border-zinc-600 resize-none" placeholder={type === 'OUT' ? 'Ej. Pago de garrafón de agua' : 'Ej. Sencillo extra ingresado a caja'} />
                            </div>

                            <button type="submit" disabled={isLoading} className={`w-full py-3 font-black uppercase tracking-widest text-xs rounded-xl transition-all disabled:opacity-50 ${type === 'OUT' ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]'}`}>
                                {isLoading ? 'Procesando...' : `Registrar ${type === 'OUT' ? 'Salida' : 'Entrada'}`}
                            </button>
                        </form>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}