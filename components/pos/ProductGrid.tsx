import React from 'react';

interface ProductGridProps {
    isLoading: boolean;
    products: any[];
    addToCart: (product: any) => void;
}

export default function ProductGrid({ isLoading, products, addToCart }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black flex items-center justify-center">
                <div className="text-zinc-600 font-mono text-xs uppercase animate-pulse">Cargando inventario...</div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black flex items-center justify-center">
                <div className="text-zinc-600 font-mono text-xs uppercase">No se encontraron productos</div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 mb-8 md:mb-0 bg-black">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {products.map(product => (
                    <button
                        key={product.id}
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className="group relative flex flex-col items-start p-3 md:p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all text-left disabled:opacity-30 disabled:cursor-not-allowed h-36 md:h-40 overflow-hidden"
                    >
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-mono text-zinc-400">
                            Stock: {product.stock}
                        </div>
                        <h3 className="font-bold text-xs md:text-sm text-zinc-200 mt-5 md:mt-6 line-clamp-2">{product.name}</h3>
                        <div className="mt-auto pt-2 w-full flex justify-between items-end">
                            <span className="font-black text-emerald-400 font-mono text-xs md:text-base">${Number(product.price).toFixed(2)}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}