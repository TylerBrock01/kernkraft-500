'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product } from '@/app/features/inventory/types';
import { Pagination } from '@/components/ui/Pagination';
import { MetadataChips } from './MetadataChips';
import {getStockLevel, StockLevel} from "@/app/(dashboard)/dashboard/inventory/utils/product";

interface InventoryTableProps {
    products: Product[];
    isLoading: boolean;
    skip: number;
    total: number;
    hasMore: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
}

const COLUMNS = [
    { label: 'ID' },
    { label: 'Producto' },
    { label: 'Precio' },
    { label: 'Atributos' },
    { label: 'Stock', right: true },
    { label: 'Estado', right: true },
];

const STOCK_TEXT: Record<StockLevel, string> = {
    ok: 'text-emerald-500',
    low: 'text-yellow-500',
    out: 'text-red-600',
};

const detailHref = (id: Product['id']) => `/dashboard/inventory/${id}`;

function StatusRow({ children }: { children: ReactNode }) {
    return (
        <tr>
            <td colSpan={COLUMNS.length} className="py-8 text-center text-sm text-zinc-500">
                {children}
            </td>
        </tr>
    );
}

export default function InventoryTable({
                                           products,
                                           isLoading,
                                           skip,
                                           total,
                                           hasMore,
                                           onNextPage,
                                           onPrevPage,
                                       }: InventoryTableProps) {
    const router = useRouter();
    const hasRows = products.length > 0;

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
            <div className="flex-1 overflow-x-auto" aria-busy={isLoading}>
                <table className="w-full border-collapse text-left">
                    <caption className="sr-only">Inventario de productos</caption>
                    <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                        {COLUMNS.map((col) => (
                            <th
                                key={col.label}
                                scope="col"
                                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 ${
                                    col.right ? 'text-right' : ''
                                }`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    {/* Al paginar se conservan las filas anteriores (atenuadas) en vez de vaciar la tabla */}
                    <tbody
                        className={`divide-y divide-zinc-800/50 transition-opacity ${
                            isLoading && hasRows ? 'opacity-50' : ''
                        }`}
                    >
                    {isLoading && !hasRows ? (
                        <StatusRow>Escaneando base de datos...</StatusRow>
                    ) : !hasRows ? (
                        <StatusRow>Bóveda vacía. Registre mercancía.</StatusRow>
                    ) : (
                        products.map((product) => {
                            const href = detailHref(product.id);
                            const level = getStockLevel(product.stock);

                            return (
                                // El clic en la fila es comodidad para el ratón; el <Link> cubre teclado y prefetch
                                <tr
                                    key={product.id}
                                    onClick={() => router.push(href)}
                                    className="cursor-pointer transition-colors hover:bg-zinc-800/20"
                                >
                                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">#{product.id}</td>

                                    <td className="px-6 py-4">
                                        <Link
                                            href={href}
                                            onClick={(e) => e.stopPropagation()} // evita navegar dos veces (link + fila)
                                            className="text-sm font-medium text-zinc-100 hover:underline focus-visible:underline"
                                        >
                                            {product.name}
                                        </Link>
                                        {product.description && (
                                            <p className="max-w-[200px] truncate text-xs text-zinc-500">{product.description}</p>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-zinc-300">${Number(product.price).toFixed(2)}</td>

                                    <td className="px-6 py-4">
                                        <MetadataChips metadata={product.metadata} />
                                    </td>

                                    <td
                                        className={`px-6 py-4 text-right text-sm font-bold uppercase tracking-widest ${STOCK_TEXT[level]}`}
                                    >
                                        {level === 'out' ? 'Agotado' : product.stock}
                                    </td>

                                    <td className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-red-600">
                                        {product.isActive ? '' : 'Inactivo'}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination
                skip={skip}
                shown={products.length}
                total={total}
                hasMore={hasMore}
                isLoading={isLoading}
                onPrev={onPrevPage}
                onNext={onNextPage}
            />
        </div>
    );
}