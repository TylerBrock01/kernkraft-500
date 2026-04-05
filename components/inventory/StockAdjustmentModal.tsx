import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

interface StockAdjustmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    product: any; // Recibe el producto para saber su ID y Stock actual
}

export default function StockAdjustmentModal({ isOpen, onClose, onSuccess, product }: StockAdjustmentModalProps) {
    const [quantity, setQuantity] = useState<number | ''>('');
    const [reason, setReason] = useState<string>('DAMAGE'); // Ajusta a tu Enum real
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!quantity || quantity <= 0) {
            toast.error('La cantidad debe ser mayor a 0');
            return;
        }
        if (quantity > product.stock) {
            toast.error('No puedes mermar más del stock actual');
            return;
        }

        setIsLoading(true);
        const toastId = toast.loading('Procesando ajuste de inventario...');

        try {
            // ⚠️ Asegúrate de que la ruta coincida con tu Controlador de NestJS
            await api.post('/stock-adjustments', {
                productId: product.id,
                quantity: Number(quantity),
                reason,
                notes
            });

            toast.success('Merma registrada. Stock actualizado.', { id: toastId });
            setQuantity('');
            setNotes('');
            onSuccess(); // Recarga el producto para ver el nuevo stock
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al registrar merma', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => !isLoading && onClose()} />
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="relative bg-zinc-950 border border-red-900/30 rounded-2xl w-full max-w-md p-6 shadow-2xl">

                        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                            <div>
                                <h3 className="text-xl font-black text-red-500 uppercase tracking-tight">Declarar Merma</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1">ID: {product.id} | {product.name}</p>
                            </div>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="flex justify-between items-end bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-red-400 block mb-1">Unidades Inservibles</label>
                                    <p className="text-[10px] text-zinc-500">Stock máximo disponible: {product.stock}</p>
                                </div>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                                    className="w-24 bg-zinc-950 border border-red-900 text-white text-xl rounded-lg px-3 py-2 outline-none focus:border-red-500 font-mono text-center"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Clasificación del Daño</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {/* ⚠️ REEMPLAZA ESTOS VALORES CON TU ENUM REAL DE NESTJS */}
                                    {[
                                        { id: 'damage', label: 'Dañado / Roto' },
                                        { id: 'THEFT', label: 'Robo' },
                                        { id: 'EXPIRATION', label: 'Caducado' },
                                        {id:'LOSS',label: 'Extraviado'},
                                        { id:'INTERNAL_USE', label: 'uso interno'},
                                        { id: 'OTHER', label: 'Otro' }
                                    ].map(r => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            onClick={() => setReason(r.id)}
                                            className={`py-2 text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all border ${reason === r.id ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
                                        >
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Observaciones (Opcional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={2}
                                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500 resize-none"
                                    placeholder="Ej. La caja llegó mojada por la lluvia..."
                                />
                            </div>

                            <div className="pt-2">
                                <button type="submit" disabled={isLoading} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all disabled:opacity-50">
                                    {isLoading ? 'Procesando Ajuste...' : 'Descontar del Inventario'}
                                </button>
                            </div>
                        </form>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}