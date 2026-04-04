'use client';

// 1. Importamos 'use' de React
import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {api} from "@/app/lib/axios/axios";

// 2. Le avisamos a TypeScript que params ahora es una Promesa
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();

    // 3. DESEMPAQUETAMOS EL ID CON EL HOOK USE()
    const resolvedParams = use(params);
    const productId = resolvedParams.id;

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // 4. Mandamos el ID limpio al backend
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        // Si tenemos ID, disparamos la petición
        if (productId) {
            fetchProduct();
        }
    }, [productId]); // 5. El useEffect ahora vigila el ID limpio

    if (isLoading) return <div className="p-8 text-zinc-500 font-mono text-sm uppercase tracking-widest animate-pulse">Recopilando expediente...</div>;
    if (!product) return <div className="p-8 text-red-500 font-mono text-sm uppercase tracking-widest">Expediente no encontrado.</div>;

    return (
        <div className="max-w-4xl w-full">
            <button
                onClick={() => router.back()}
                className="text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
                ← Volver al Inventario
            </button>

            {/* TARJETA DEL PRODUCTO */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8 backdrop-blur-md">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-100">{product.name}</h1>
                        <p className="text-zinc-500 font-mono text-sm mt-2">ID: {product.id} <span className="text-zinc-700">//</span> TIPO: {product.type.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Precio Unitario</p>
                        <p className="text-3xl font-mono text-emerald-400">${Number(product.price).toFixed(2)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 border-b border-zinc-800/50 pb-2">Descripción</h3>
                        <p className="text-sm text-zinc-300 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 border-b border-zinc-800/50 pb-2">Estado Operativo</h3>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                                <p className="text-sm text-zinc-300 font-mono">Stock actual: <span className="text-zinc-100 font-bold">{product.stock}</span> unidades</p>
                            </div>
                        </div>

                        {/* RENDERIZADO DE METADATA (Opcional, si existe) */}
                        {product.metadata && Object.keys(product.metadata).length > 0 && (
                            <div>
                                <h3 className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-3 border-b border-blue-900/30 pb-2">Atributos Extendidos</h3>
                                <div className="space-y-2">
                                    {Object.entries(product.metadata).map(([key, value]) => (
                                        <div key={key} className="flex justify-between text-sm">
                                            <span className="text-zinc-500 font-mono">{key}:</span>
                                            <span className="text-zinc-300">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}