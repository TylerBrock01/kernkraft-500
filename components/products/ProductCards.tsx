import {Product} from "@/src/schema";
import {formatCurrency, getImagePath, isAvailable} from "@/src/utils";
import Image from "next/image";
import AddProductButton from "@/components/products/AddProductButton";
import Link from "next/link";

export default function ProductCard({product}: { product: Product}) {
    return (
        <Link href={`/products/${product.id}`} className="group cursor-pointer relative bg-zinc-900/30 border border-white rounded-2xl overflow-hidden transition-all duration-500 hover:border-yellow-400/40 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(250,204,21,0.05)]">

            {/* Contenedor de Imagen */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                <Image
                    src={'https://cdn.pixabay.com/photo/2014/04/02/16/29/skate-board-307418_1280.png'}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 ${product.stock === 0 ? 'grayscale opacity-30' : 'opacity-90 group-hover:opacity-100'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* --- AQUÍ VA EL BLOQUE DE AGOTADO --- */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                        <p className="w-full bg-red-600 text-white py-3 text-2xl uppercase font-black italic tracking-tighter -rotate-6 shadow-2xl border-y border-white/20 text-center">
                            Agotado
                        </p>
                    </div>
                )}

                {/* Badge de Stock */}
                <div className="absolute top-3 left-3 z-20">
            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter backdrop-blur-md border ${
                product.stock <= 3 && product.stock > 0
                    ? "bg-red-500/20 border-red-500/50 text-red-500"
                    : "bg-black/80 border-white/10 text-zinc-400"
            }`}>
                {product.stock === 0 ? 'Sin existencias' : product.stock <= 3 ? `¡Solo ${product.stock}!` : `Stock: ${product.stock}`}
            </span>
                </div>
            </div>

            {/* Info del Producto */}
            <div className="p-5 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-yellow-400 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{product.color}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Size: {product.size}</span>
                </div>

                {/* Precio y Botón */}
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-col">
                <span className={`text-2xl font-black italic tracking-tighter ${product.stock === 0 ? 'text-zinc-600' : 'text-white'}`}>
                    ${product.price.toLocaleString()}
                </span>
                    </div>

                    {/* Lógica para ocultar o deshabilitar el botón si no hay stock */}
                    {product.stock > 0 ? (
                        <AddProductButton product={product}/>
                    ) : (
                        <span className="text-[10px] font-black uppercase text-zinc-600 border border-zinc-800 px-3 py-2 rounded-xl">
                    No disponible
                </span>
                    )}
                </div>
            </div>

            {/* Línea decorativa inferior */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full"></div>
        </Link>

    )
}