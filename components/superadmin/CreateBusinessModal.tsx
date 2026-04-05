import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

interface CreateBusinessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateBusinessModal({ isOpen, onClose, onSuccess }: CreateBusinessModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        plan: 'LITE',
        type: 'RETAIL', // Ajusta los values según tu Enum BusinessType
        description: '',
        config: {
            primaryColor: '#3b82f6', // Un azul por defecto
            logoUrl: '',
            currency: 'MXN',
            taxRate: 16
        }
    });

    // Generador automático de Slug basado en el nombre
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        const autoSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setFormData({ ...formData, name: newName, slug: autoSlug });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading('Desplegando nueva instancia...');

        try {
            // Validar que la tasa de impuestos sea número
            const payload = {
                ...formData,
                config: {
                    ...formData.config,
                    taxRate: Number(formData.config.taxRate)
                }
            };

            await api.post('/business', payload);
            toast.success('Instancia creada exitosamente', { id: toastId });
            onSuccess();
            onClose();
            // Reseteo
            setFormData({
                name: '', slug: '', plan: 'LITE', type: 'RETAIL', description: '',
                config: { primaryColor: '#3b82f6', logoUrl: '', currency: 'MXN', taxRate: 16 }
            });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Fallo crítico al crear negocio', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => !isLoading && onClose()} />
                    <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="relative bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-y-auto max-h-[90vh]">

                        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Nueva Instancia</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1 tracking-widest uppercase">Protocolo de Creación SuperAdmin</p>
                            </div>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                {/* NOMBRE Y SLUG */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Nombre del Negocio *</label>
                                    <input required minLength={3} type="text" value={formData.name} onChange={handleNameChange} className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500" placeholder="Ej. CAZA Agency" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Slug (Identificador Único) *</label>
                                    <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase()})} className="w-full bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500" placeholder="caza-agency" />
                                </div>

                                {/* PLAN Y TIPO */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Nivel de Suscripción</label>
                                    <select value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm font-bold tracking-wider rounded-lg px-4 py-3 outline-none focus:border-emerald-500 cursor-pointer appearance-none">
                                        <option value="LITE">LITE</option>
                                        <option value="STARTER">STARTER</option>
                                        <option value="PRO">PRO</option>
                                        <option value="BUSINESS">BUSINESS</option>
                                        <option value="ZENITH">ZENITH (Máx. Potencia)</option>
                                    </select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Giro Operativo</label>
                                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500 cursor-pointer appearance-none">
                                        {/* Reemplaza estas opciones con los valores exactos de tu Enum BusinessType */}
                                        <option value="retail">Punto de Venta (Retail)</option>
                                        <option value="rental">Rentas y Alquiler</option>
                                        <option value="service">Agencia / Servicios</option>
                                        <option value="food">Gastronomía</option>
                                    </select>
                                </div>

                                {/* DESCRIPCIÓN */}
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Descripción</label>
                                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none" placeholder="Breve resumen de las operaciones..." />
                                </div>
                            </div>

                            {/* BLOQUE DE CONFIGURACIÓN FINANCIERA Y VISUAL */}
                            <div className="border border-zinc-800 bg-zinc-900/50 p-5 rounded-xl space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 border-b border-zinc-800/50 pb-2">Configuración Base (DTO Config)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Moneda Operativa</label>
                                        <input type="text" value={formData.config.currency} onChange={e => setFormData({...formData, config: {...formData.config, currency: e.target.value.toUpperCase()}})} maxLength={3} className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="MXN" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Tasa de Impuesto (%)</label>
                                        <input type="number" min="0" step="0.01" value={formData.config.taxRate} onChange={e => setFormData({...formData, config: {...formData.config, taxRate: Number(e.target.value)}})} className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="16" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Color Primario (Hex)</label>
                                            <input type="text" value={formData.config.primaryColor} onChange={e => setFormData({...formData, config: {...formData.config, primaryColor: e.target.value}})} className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="#000000" />
                                        </div>
                                        <div className="w-10 h-10 rounded-lg border border-zinc-700 mt-6 shrink-0 shadow-inner" style={{ backgroundColor: formData.config.primaryColor }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-800">
                                <button type="submit" disabled={isLoading} className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all disabled:opacity-50">
                                    {isLoading ? 'Inyectando a Base de Datos...' : 'Autorizar y Desplegar Negocio'}
                                </button>
                            </div>
                        </form>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}