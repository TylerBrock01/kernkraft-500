import { Product } from "@/src/schema";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react"; // O tu AddProductButton

export default function ProductCard({ product }: { product: Product }) {
    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 3;

    return (
        <Link
            href={`/products/${product.id}`}
            id={`product-card-${product.id}`}
            className="group relative bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-yellow-400/40 hover:bg-zinc-900/40"
        >
            {/* 1. Contenedor de Imagen (Media) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                <Image
                    src={getImagePath(product.image)}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 
                        ${isOutOfStock ? 'grayscale opacity-20' : 'opacity-80 group-hover:opacity-100'}`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Badge de Stock Dinámico */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {isLowStock && (
                        <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm animate-pulse">
                            ¡Solo {product.stock}!
                        </span>
                    )}
                    {product.deck && (
                        <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border border-white/10 rounded-sm">
                            {product.deck.name}
                        </span>
                    )}
                </div>

                {/* Overlay de Agotado (Brutalista) */}
                {isOutOfStock && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                        <p className="w-full bg-zinc-800/80 text-zinc-500 py-2 text-xl uppercase font-black italic tracking-tighter -rotate-12 border-y border-white/5 text-center">
                            Sold Out
                        </p>
                    </div>
                )}

            </div>

            {/* 2. Información del Producto */}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-col">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                        {product.category?.name || 'Hardware'}
                    </p>
                    <h3 className="text-sm font-bold text-white uppercase italic tracking-tight line-clamp-1 group-hover:text-yellow-400 transition-colors">
                        {product.name}
                    </h3>
                </div>

                {/* Detalles Técnicos */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: product.color }} />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">{product.color}</span>
                    </div>
                    <span className="text-zinc-800">|</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Size: {product.size}"</span>
                </div>

                {/* Precio con Estética de Dashboard */}
                <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xl font-black italic tracking-tighter ${isOutOfStock ? 'text-zinc-700' : 'text-white'}`}>
                        {formatCurrency(product.price)}
                    </span>

                    {!isOutOfStock && isLowStock && (
                        <span className="text-[8px] font-black text-red-500 uppercase border border-red-500/20 px-2 py-0.5 rounded-sm">
                            Urgente
                        </span>
                    )}
                </div>
            </div>

            {/* Barra de Progreso de "Heat" (Hover Decorativo) */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-400 transition-all duration-700 group-hover:w-full shadow-[0_0_10px_#facc15]" />
        </Link>
    );
}