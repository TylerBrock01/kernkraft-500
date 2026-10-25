'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useProduct } from '@/app/features/inventory/hooks/useProduct';
import ProductDrawer from '../components/ProductDrawer';
import StockAdjustmentModal from '../components/StockAdjustmentModal';
import { ProductGallery } from './_components/ProductGallery';
import { StockPanel } from './_components/StockPanel';
import { MetadataList } from './_components/MetadataList';
import {getProductImages} from "@/app/(dashboard)/dashboard/inventory/utils/product";

const BackLink = () => (
    <Link
        href="/dashboard/inventory"
        className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
    >
        ← Volver al Inventario
    </Link>
);

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { product, isLoading, notFound, error, actionError, isToggling, toggleActive, refresh, retry } =
        useProduct(id);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isLossOpen, setIsLossOpen] = useState(false);

    if (isLoading) {
        return (
            <p role="status" className="animate-pulse p-8 font-mono text-sm uppercase tracking-widest text-zinc-500">
                Recopilando expediente...
            </p>
        );
    }

    if (notFound) {
        return (
            <div className="p-8">
                <BackLink />
                <p className="font-mono text-sm uppercase tracking-widest text-red-500">Expediente no encontrado.</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-8">
                <BackLink />
                <div role="alert" className="flex max-w-md items-center justify-between gap-4 rounded-lg border border-red-900/50 bg-red-950/50 p-3">
                    <p className="font-mono text-xs text-red-400">{error ?? 'No se pudo cargar el producto.'}</p>
                    <button
                        type="button"
                        onClick={retry}
                        className="text-xs font-bold uppercase tracking-widest text-red-300 hover:text-red-100"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid w-full max-w-6xl gap-2">
            <BackLink />

            {/* CONTROLES */}
            <div className="flex justify-between gap-3 md:justify-end lg:justify-start">
                <button
                    type="button"
                    onClick={toggleActive}
                    disabled={isToggling}
                    className={`rounded-lg border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                        product.isActive
                            ? 'border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                            : 'border-blue-500/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                    {isToggling ? 'Procesando...' : product.isActive ? 'Desactivar Mercancía' : 'Reactivar Mercancía'}
                </button>

                <button
                    type="button"
                    onClick={() => setIsEditOpen(true)}
                    className="rounded-lg bg-zinc-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all hover:bg-white"
                >
                    Editar Expediente
                </button>
            </div>

            {actionError && (
                <p role="alert" className="font-mono text-xs text-red-400">
                    {actionError}
                </p>
            )}

            {/* FICHA */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-2xl backdrop-blur-md md:flex-row">
                <ProductGallery images={getProductImages(product)} alt={product.name} />

                <div className="flex-1 p-8 md:p-10">
                    <div className="mb-6 flex items-start justify-between gap-4 border-b border-zinc-800 pb-6">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-zinc-100">{product.name}</h1>
                                <span
                                    role="img"
                                    aria-label={product.isActive ? 'Activo' : 'Inactivo'}
                                    className={`h-2.5 w-2.5 rounded-full ${
                                        product.isActive ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-zinc-700'
                                    }`}
                                />
                            </div>
                            <p className="mt-2 font-mono text-sm text-zinc-500">
                                ID: {product.id} <span className="text-zinc-700">//</span> SLUG: {product.slug}{' '}
                                <span className="text-zinc-700">//</span> TIPO: {product.type?.toUpperCase() ?? '—'}
                            </p>
                        </div>

                        <div className="shrink-0 text-right">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Precio Unitario</p>
                            <p className="font-mono text-3xl font-black tracking-tight text-emerald-400">
                                ${Number(product.price).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                            <h3 className="mb-3 border-b border-zinc-800/50 pb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                Descripción
                            </h3>
                            <p className="max-w-lg text-sm leading-relaxed text-zinc-300">
                                {product.description || 'Sin descripción disponible.'}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <StockPanel stock={product.stock} onRegisterLoss={() => setIsLossOpen(true)} />
                            <MetadataList metadata={product.metadata} />
                        </div>
                    </div>
                </div>
            </div>

            <ProductDrawer
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSuccess={refresh}
                productToEdit={product}
            />
            <StockAdjustmentModal
                isOpen={isLossOpen}
                onClose={() => setIsLossOpen(false)}
                onSuccess={refresh}
                product={product}
            />
        </div>
    );
}