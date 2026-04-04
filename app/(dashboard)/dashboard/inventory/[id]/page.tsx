'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {api} from "@/app/lib/axios/axios";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${params.id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    if (isLoading) return <div className="p-8 text-zinc-500">Recopilando expediente...</div>;
    if (!product) return <div className="p-8 text-red-500">Expediente no encontrado.</div>;

    return (
        <div className="max-w-4xl w-full">
            <button
                onClick={() => router.back()}
                className="text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white mb-6 flex items-center gap-2"
            >
                ← Volver al Inventario
            </button>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8 backdrop-blur-md">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-100">{product.name}</h1>
                        <p className="text-zinc-500 font-mono text-sm mt-2">ID: {product.id} // TIPO: {product.type.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Precio Unitario</p>
                        <p className="text-3xl font-mono text-emerald-400">${Number(product.price).toFixed(2)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Descripción</h3>
                        <p className="text-sm text-zinc-300">{product.description}</p>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Estado del Inventario</h3>
                        <p className="text-sm text-zinc-300 font-mono">Stock actual: {product.stock} unidades</p>
                    </div>
                </div>
            </div>
        </div>
    );
}