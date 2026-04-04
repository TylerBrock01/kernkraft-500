import React from 'react';

// Tipamos las propiedades (Props) que este componente necesita para funcionar
export interface Product {
    metadata: any;
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    type: string;
}

interface InventoryTableProps {
    products: Product[];
    isLoading: boolean;
    skip: number;
    take: number;
    hasMore: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
}

export default function InventoryTable({
                                           products, isLoading, skip, take, hasMore, onNextPage, onPrevPage
                                       }: InventoryTableProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden flex flex-col h-full">
            <div className="overflow-x-auto flex-1">
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
                                <td className="px-6 py-4 text-sm text-zinc-300">${Number(product.price).toFixed(2)}</td>
                                {/*metadata*/}
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-zinc-100 mb-0.5">{product.name}</p>
                                    <p className="text-xs text-zinc-500 truncate max-w-[200px]">{product.description}</p>

                                    {/* 📦 RENDERIZADOR UNIVERSAL DE METADATA */}
                                    {product.metadata && Object.keys(product.metadata).length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {Object.entries(product.metadata)
                                                .slice(0, 3) // Mostramos máximo 3 para no saturar la tabla
                                                .map(([key, value]) => (
                                                    <span key={key} className="inline-flex items-center gap-1 bg-zinc-800/50 border border-zinc-700/50 text-[9px] text-zinc-400 px-1.5 py-0.5 rounded-md font-mono">
                                                    <span className="text-zinc-500">{key}:</span>
                                                    <span className="text-zinc-300 truncate max-w-[80px]">
                                                    {String(value)}
                                                    </span>
                                                </span>
                                                ))}
                                            {Object.keys(product.metadata).length > 3 && (
                                                <span className="inline-flex items-center bg-zinc-800/50 border border-zinc-700/50 text-[9px] text-zinc-500 px-1.5 py-0.5 rounded-md font-mono">
                                                    +{Object.keys(product.metadata).length - 3} más
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>
                                {/*fin metada data*/}
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
            </div>

            {/* CONTROLES DE PAGINACIÓN INTEGRADADOS */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/20">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Mostrando {products.length} registros
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={onPrevPage} disabled={skip === 0}
                        className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-zinc-300 bg-zinc-800/50 rounded-md hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={onNextPage} disabled={!hasMore}
                        className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-zinc-300 bg-zinc-800/50 rounded-md hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}