import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import toast from "react-hot-toast";

interface TeamDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function TeamDrawer({ isOpen, onClose, onSuccess }: TeamDrawerProps) {
    const [formData, setFormData] = useState({
        name: '', lastName: '', email: '', password: '', phone: '', role: 'vendedor',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Verificando credenciales...');
        try {
            // 🚀 MODIFICACIÓN AQUÍ: Le pegamos a la ruta exacta de tu backend
            await api.post('/users/employee', formData); // O '/auth/employee', según tu Controller

            setFormData({ name: '', lastName: '', email: '', password: '', phone: '', role: '' });
            onSuccess();
            onClose();
            toast.success('Personal registrado con éxito', { id: toastId });
        } catch (error) {
            console.error('Error registrando personal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto">

                        <div className="flex justify-between items-center mb-8 shrink-0">
                            <h2 className="text-xl font-bold text-zinc-100">Alta de Personal</h2>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">

                            {/* 🛡️ SELECTOR DE NIVEL DE ACCESO */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Nivel de Acceso (Rol)</label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {['admin', 'almacen', 'vendedor'].map((r) => (
                                        <button key={r} type="button" onClick={() => setFormData({ ...formData, role: r })} className={`py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg border transition-all ${formData.role === r ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 👤 DATOS PERSONALES */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Nombre</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Apellido</label>
                                    <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>

                            {/* 🔐 CREDENCIALES */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Correo Electrónico</label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Contraseña de Acceso</label>
                                <input required type="password" minLength={6} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-widest" placeholder="••••••••" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Teléfono (Opcional)</label>
                                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 font-mono" />
                            </div>

                            <div className="pt-6 mt-auto border-t border-zinc-800 shrink-0">
                                <button type="submit" disabled={isLoading} className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all disabled:opacity-50">
                                    {isLoading ? 'Registrando...' : 'Otorgar Acceso'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}