import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {api} from "@/app/lib/axios/axios";

interface ProductDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

// ... imports

export default function ProductDrawer({ isOpen, onClose, onSuccess }: ProductDrawerProps) {
    const [formData, setFormData] = useState({
        name: '', description: '', price: 0, stock: 0, type: 'retail',
    });

    // 🧠 ESTADO UNIVERSAL PARA METADATA (Arreglo de Clave/Valor)
    const [metadataParams, setMetadataParams] = useState<{key: string, value: string}[]>([]);

    const addMetadataRow = () => setMetadataParams([...metadataParams, { key: '', value: '' }]);

    const updateMetadata = (index: number, field: 'key' | 'value', val: string) => {
        const newParams = [...metadataParams];
        newParams[index][field] = val;
        setMetadataParams(newParams);
    };

    const removeMetadataRow = (index: number) => {
        setMetadataParams(metadataParams.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('description', formData.description);
            formPayload.append('price', String(formData.price));
            formPayload.append('stock', String(formData.stock));
            formPayload.append('type', formData.type);

            // 📦 Transformar el arreglo [{key: "material", value: "PVC"}] a {"material": "PVC"}
            const metadataObject: Record<string, any> = {};
            metadataParams.forEach(param => {
                const k = param.key.trim();
                const v = param.value.trim();
                if (k && v) {
                    // Micro-magia: Si escriben "true", lo vuelve booleano. Si escriben "500", lo vuelve número.
                    let finalValue: any = v;
                    if (v.toLowerCase() === 'true') finalValue = true;
                    else if (v.toLowerCase() === 'false') finalValue = false;
                    else if (!isNaN(Number(v)) && v !== '') finalValue = Number(v);

                    metadataObject[k] = finalValue;
                }
            });

            // Solo mandamos metadata si realmente hay datos
            if (Object.keys(metadataObject).length > 0) {
                formPayload.append('metadata', JSON.stringify(metadataObject));
            }

            await api.post('/products', formPayload, { headers: { 'Content-Type': 'multipart/form-data' } });

            // Reset
            setFormData({ name: '', description: '', price: 0, stock: 0, type: 'retail' });
            setMetadataParams([]);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al registrar producto:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-8 shrink-0">
                            <h2 className="text-xl font-bold text-zinc-100">Nueva Carga</h2>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">

                            {/* 🏷️ SELECTOR DE TIPO (Arquitectura) */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Clasificación</label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {['retail', 'food', 'service'].map((t) => (
                                        <button
                                            key={t} type="button"
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className={`py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg border transition-all ${
                                                formData.type === t
                                                    ? 'bg-zinc-100 text-zinc-950 border-zinc-100'
                                                    : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 📊 DATOS BÁSICOS */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Nombre</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Precio ($)</label>
                                    <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500 font-mono" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Stock</label>
                                    <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500 font-mono" />
                                </div>
                            </div>

                            {/* 🧠 ZONA DE METADATA */}
                            {/* 🧠 ZONA DE METADATA UNIVERSAL */}
                            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Atributos Dinámicos</h3>
                                </div>

                                <div className="space-y-2">
                                    {/* Fila de encabezados sutiles */}
                                    {metadataParams.length > 0 && (
                                        <div className="flex gap-2 px-1">
                                            <span className="flex-1 text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Propiedad (Ej. material)</span>
                                            <span className="flex-1 text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Valor (Ej. PVC)</span>
                                            <span className="w-8"></span>
                                        </div>
                                    )}

                                    {metadataParams.map((param, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text" value={param.key} onChange={(e) => updateMetadata(index, 'key', e.target.value)}
                                                placeholder="Propiedad..."
                                                className="flex-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                                            />
                                            <input
                                                type="text" value={param.value} onChange={(e) => updateMetadata(index, 'value', e.target.value)}
                                                placeholder="Valor..."
                                                className="flex-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                                            />
                                            <button
                                                type="button" onClick={() => removeMetadataRow(index)}
                                                className="w-8 flex items-center justify-center rounded-lg border border-red-900/30 text-red-500 hover:bg-red-500/10 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button" onClick={addMetadataRow}
                                        className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 hover:text-emerald-300 mt-2 block"
                                    >
                                        + Agregar Atributo
                                    </button>
                                </div>
                            </div>
                            <div className="pt-6 mt-auto border-t border-zinc-800 shrink-0">
                                <button type="submit" className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    Registrar en Base de Datos
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}