'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {api} from "@/app/lib/axios/axios";
import ProductDrawer from "@/components/inventory/ProductDrawer";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const productId = resolvedParams.id;

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleToggleStatus = async () => {
        try {
            // Mandamos un JSON sencillo porque el backend NestJS (ValidationPipe) lo detecta
            // y procesa sin problemas aunque tenga el FileInterceptor, gracias a que no mandamos FormData.
            await api.patch(`/products/${productId}`, {
                isActive: !product.isActive
            });
            // Recargamos el producto para ver el cambio instantáneo
            fetchProduct();
        } catch (error) {
            console.error('Error cambiando el estado:', error);
        }
    };

    if (isLoading) return <div className="p-8 text-zinc-500 font-mono text-sm uppercase tracking-widest animate-pulse">Recopilando expediente...</div>;
    if (!product) return <div className="p-8 text-red-500 font-mono text-sm uppercase tracking-widest">Expediente no encontrado.</div>;

    return (
        <div className="max-w-6xl w-full"> {/* Aumentamos un poco el ancho máximo */}
            <button
                onClick={() => router.back()}
                className="text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
                ← Volver al Inventario
            </button>
            {/* 🛠️ BOTONES DE CONTROL TÁCTICO */}
            <div className="flex gap-3">
                <button
                    onClick={handleToggleStatus}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                        product.isActive
                            ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                    {product.isActive ? 'Desactivar Mercancía' : 'Reactivar Mercancía'}
                </button>

                <button
                    onClick={() => setIsEditDrawerOpen(true)}
                    className="px-4 py-2 bg-zinc-100 text-zinc-950 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    Editar Expediente
                </button>
            </div>
            {/* 🚀 TARJETA DEL PRODUCTO REESTRUCTURADA */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row shadow-2xl">

                {/* 📸 COLUMNA IZQUIERDA: LA FOTOGRAFÍA */}
                <div className="w-full md:w-2/5 h-80 md:h-auto border-b md:border-b-0 md:border-r border-zinc-800 bg-black/20 flex items-center justify-center overflow-hidden relative group">
                    {product.image ? (
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="text-center opacity-30 flex flex-col items-center">
                            <span className="text-6xl mb-3">📸</span>
                            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Sin Imagen</p>
                        </div>
                    )}

                    {/* Degradado sutil superpuesto en la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* 📊 COLUMNA DERECHA: LOS DATOS */}
                <div className="flex-1 p-8 md:p-10">

                    <div className="flex justify-between items-start border-b border-zinc-800 pb-6 mb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">{product.name}</h1>
                                {/* Estado Activo/Inactivo Táctico */}
                                <div className={`w-2.5 h-2.5 rounded-full ${product.isActive ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-zinc-700'}`}></div>
                            </div>
                            <p className="text-zinc-500 font-mono text-sm mt-2">
                                ID: {product.id} <span className="text-zinc-700">//</span>
                                SLUG: {product.slug} <span className="text-zinc-700">//</span>
                                TIPO: {product.type.toUpperCase()}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Precio Unitario</p>
                            <p className="text-3xl font-mono text-emerald-400 font-black tracking-tight">
                                ${Number(product.price).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 border-b border-zinc-800/50 pb-2">Descripción</h3>
                            <p className="text-sm text-zinc-300 leading-relaxed max-w-lg">{product.description || 'Sin descripción disponible.'}</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 border-b border-zinc-800/50 pb-2">Estado Operativo</h3>
                                <div className={`flex items-center gap-3 p-3 rounded-lg border ${product.stock > 5 ? 'border-emerald-900/30 bg-emerald-950/20' : 'border-red-900/30 bg-red-950/20 animate-pulse'}`}>
                                    <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                    <p className="text-sm text-zinc-300 font-mono flex-1">
                                        Stock actual: <span className="text-zinc-100 font-bold">{product.stock}</span> unidades
                                    </p>
                                    <span className="text-[10px] uppercase font-bold text-emerald-400">Saludable</span>
                                </div>
                            </div>

                            {/* RENDERIZADO UNIVERSAL DE METADATA (Itera sobre cualquier campo JSONB) */}
                            {product.metadata && Object.keys(product.metadata).length > 0 && (
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-3 border-b border-blue-900/30 pb-2">Atributos Extendidos (Universal JSONB)</h3>
                                    <div className="bg-zinc-900 rounded-lg p-3 space-y-2 border border-zinc-800">
                                        {Object.entries(product.metadata).map(([key, value]) => (
                                            <div key={key} className="flex justify-between text-xs border-b border-zinc-800/50 pb-2 last:border-b-0 last:pb-0 gap-4">
                                                <span className="text-zinc-500 font-mono lowercase tracking-wide">{key}:</span>
                                                <span className="text-zinc-300 font-medium truncate max-w-[200px]">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
            <ProductDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                onSuccess={fetchProduct} // Si edita con éxito, recarga la ficha técnica al instante
                productToEdit={product}  // Le pasamos el cerebro completo
            />
        </div>
    );
}