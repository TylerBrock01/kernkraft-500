'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {api} from "@/app/lib/axios/axios";

// 1. Tipamos nuestro frontend exactamente igual que tu Entity
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    type: string;
}

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // ⚙️ Controles de Paginación
    const [skip, setSkip] = useState(0);
    const take = 10; // Límite por página
    const [hasMore, setHasMore] = useState(true); // Para saber si apagamos el botón "Siguiente"


    // Estado del formulario para el POST
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        type: 'retail',
    });

    // 2. Traer la carga inicial (GET)
    const fetchProducts = async (currentSkip = skip) => {
        setIsLoading(true);
        try {
            const response = await api.get('/products', {
                params: { take, skip: currentSkip }
            });

            // 💡 EL CAMBIO CLAVE: Extraemos las propiedades exactas de tu nuevo JSON
            const fetchedProducts = response.data.products;
            const totalCount = response.data.total;

            setProducts(fetchedProducts);

            // 🎯 Paginación perfecta: ¿El siguiente salto supera el total de la base de datos?
            setHasMore(currentSkip + take < totalCount);

        } catch (error) {
            console.error('Error obteniendo inventario:', error);
        } finally {
            setIsLoading(false);
        }
    };
    // Importante: El useEffect ahora escucha los cambios de "skip"
    useEffect(() => {
        fetchProducts();
    }, [skip]); // <--- Agrega el skip aquí

    // 3. Registrar nueva mercancía (POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 🏗️ Usamos FormData porque el backend tiene un FileInterceptor
            const formPayload = new FormData();

            formPayload.append('name', formData.name);
            formPayload.append('description', formData.description);
            formPayload.append('price', String(formData.price)); // FormData solo acepta strings o archivos
            formPayload.append('stock', String(formData.stock));
            formPayload.append('type', formData.type);

            // 💡 Nota para el futuro: Cuando actives Cloudinary,
            // solo agregarás: formPayload.append('file', archivoSeleccionado);

            await api.post('/products', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsDrawerOpen(false); // Cerramos compuerta
            fetchProducts(); // Recargamos la tabla para ver el nuevo producto

            // Limpiamos el formulario
            setFormData({ name: '', description: '', price: 0, stock: 0, type: 'RETAIL' });
        } catch (error) {
            console.error('Error al registrar producto:', error);
        }
    };

    return (
        <div className="w-full relative h-full">
            {/* HEADER DE LA SECCIÓN */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Inventario Global</h1>
                    <p className="text-zinc-500 text-sm mt-1">Gestión de mercancía y existencias</p>
                </div>
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2"
                >
                    <span>+</span> Recepción de Carga
                </button>
            </div>

            {/* DATA GRID (LA TABLA DE CRISTAL) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">ID</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Producto</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Precio</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Stock</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                        {isLoading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-zinc-500 text-sm">Escaneando base de datos...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-zinc-500 text-sm">Bóveda vacía. Registre mercancía.</td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-zinc-800/20 transition-colors group">
                                    <td className="px-6 py-4 text-xs font-mono text-zinc-500">#{product.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-zinc-100">{product.name}</p>
                                        <p className="text-xs text-zinc-500 truncate max-w-[200px]">{product.description}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-300">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        {/* Indicador visual táctico de Stock */}
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                            product.stock <= 5 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock <= 5 ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                                            {product.stock} unds
                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${product.isActive ? 'text-blue-400' : 'text-zinc-600'}`}>
                        {product.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                    {/* CONTROLES DE PAGINACIÓN */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/20">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                            Mostrando {products.length} registros
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSkip(Math.max(0, skip - take))}
                                disabled={skip === 0}
                                className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-zinc-300 bg-zinc-800/50 rounded-md hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => setSkip(skip + take)}
                                disabled={!hasMore}
                                className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-zinc-300 bg-zinc-800/50 rounded-md hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* DRAWER (PANEL LATERAL PARA NUEVO PRODUCTO) */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Fondo oscuro difuminado */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40"
                        />
                        {/* El Panel */}
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-zinc-100">Nueva Carga</h2>
                                <button onClick={() => setIsDrawerOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Nombre del Artículo</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:ring-1 focus:ring-zinc-500 outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Precio ($)</label>
                                        <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:ring-1 focus:ring-zinc-500 outline-none transition-all font-mono" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Stock Inicial</label>
                                        <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:ring-1 focus:ring-zinc-500 outline-none transition-all font-mono" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Descripción</label>
                                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 focus:ring-1 focus:ring-zinc-500 outline-none transition-all resize-none" />
                                </div>

                                <div className="pt-6 mt-6 border-t border-zinc-800">
                                    <button type="submit" className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all">
                                        Registrar en Base de Datos
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}