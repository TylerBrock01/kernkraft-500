'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInventory } from '@/app/features/inventory/hooks/useInventory';
import SearchInput from './components/SearchInput';
import InventoryTable from './components/InventoryTable';
import ProductDrawer from './components/ProductDrawer';

export default function InventoryPage() {
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const inventory = useInventory();

    return (
        <div className="flex h-full w-full flex-col">
            {/* HEADER */}
            <div className="mb-8 flex shrink-0 flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Inventario Global</h1>
                    <p className="mt-1 text-sm text-zinc-500">Gestión de mercancía y existencias</p>
                </div>

                <SearchInput onSearch={inventory.handleSearch} />

                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    <span aria-hidden>+</span> Recepción de Carga
                </button>
            </div>

            {/* ERROR */}
            {inventory.error && (
                <div
                    role="alert"
                    className="mb-4 flex shrink-0 items-center justify-between gap-4 rounded-lg border border-red-900/50 bg-red-950/50 p-3"
                >
                    <p className="font-mono text-xs text-red-400">{inventory.error}</p>
                    <button
                        type="button"
                        onClick={inventory.retry}
                        className="text-xs font-bold uppercase tracking-widest text-red-300 hover:text-red-100"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* TABLA */}
            <div className="min-h-0 flex-1">
                <InventoryTable
                    products={inventory.products}
                    isLoading={inventory.isLoading}
                    skip={inventory.skip}
                    take={inventory.take}
                    hasMore={inventory.hasMore}
                    onNextPage={inventory.nextPage}
                    onPrevPage={inventory.prevPage}
                    onRowClick={(id) => router.push(`/dashboard/inventory/${id}`)}
                />
            </div>

            <ProductDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSuccess={inventory.reloadFromStart}
            />
        </div>
    );
}