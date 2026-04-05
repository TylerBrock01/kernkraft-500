import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

interface CustomerDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (newCustomer: any) => void; // 🧠 Devolvemos el cliente creado para auto-seleccionarlo
}

export default function CustomerDrawer({ isOpen, onClose, onSuccess }: CustomerDrawerProps) {
    const [formData, setFormData] = useState({
        name: '', phone: '', addressLink: '', notes: '', hasRetainedId: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Registrando cliente...');

        try {
            const response = await api.post('/customers', formData);
            toast.success('Cliente guardado exitosamente', { id: toastId });

            // Limpiamos y mandamos el cliente de regreso al POS
            setFormData({ name: '', phone: '', addressLink: '', notes: '', hasRetainedId: false });
            onSuccess(response.data.customer || response.data);
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al registrar cliente', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 p-4 sm:p-6 flex flex-col shadow-2xl overflow-y-auto">

                        <div className="flex justify-between items-center mb-6 sm:mb-8 shrink-0">
                            <h2 className="text-lg sm:text-xl font-bold text-zinc-100">Nuevo Cliente</h2>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white p-2">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex-1 flex flex-col">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Nombre Completo *</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-white text-xs sm:text-sm rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-blue-500" placeholder="Ej. Juan Pérez" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Teléfono</label>
                                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-white text-xs sm:text-sm font-mono rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-blue-500" placeholder="10 dígitos" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Ubicación / Link</label>
                                <input type="text" value={formData.addressLink} onChange={(e) => setFormData({...formData, addressLink: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-blue-400 text-xs sm:text-sm font-mono rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-blue-500" placeholder="https://maps..." />
                            </div>

                            <div className="bg-blue-900/10 border border-blue-900/30 p-3 sm:p-4 rounded-xl flex items-center justify-between cursor-pointer" onClick={() => setFormData({...formData, hasRetainedId: !formData.hasRetainedId})}>
                                <div>
                                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-400 mb-0.5 sm:mb-1">ID Retenida</p>
                                    <p className="text-[9px] sm:text-[10px] text-zinc-500 pr-2">¿Dejará su INE/ID en mostrador?</p>
                                </div>
                                <div className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full p-1 transition-colors shrink-0 ${formData.hasRetainedId ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                                    <div className={`w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full transition-transform ${formData.hasRetainedId ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Notas Internas</label>
                                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows={3} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-xs sm:text-sm rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-blue-500 resize-none" placeholder="Ej. Cliente frecuente..." />
                            </div>

                            <div className="pt-4 sm:pt-6 mt-auto border-t border-zinc-800 shrink-0">
                                <button type="submit" disabled={isLoading} className="w-full bg-zinc-100 text-zinc-950 font-bold text-[10px] sm:text-xs uppercase tracking-widest py-3 sm:py-4 rounded-lg hover:bg-white transition-all disabled:opacity-50">
                                    {isLoading ? 'Guardando...' : 'Registrar Cliente'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}