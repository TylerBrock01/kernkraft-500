// app/(store)/products/lastProducts/page.tsx
import { ProductResponseSchema } from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

async function getProduct() {
    const url = `${process.env.API_URL}/products?take=4`
    const req = await fetch(url, {
        next: {
            tags: ['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok) {
        redirect('/categories/1')
    }
    return ProductResponseSchema.parse(json)
}

export default async function LastProductPage() {
    const { products } = await getProduct() // Desestructuramos para limpiar código

    return (
        <section className="w-full bg-black">
            {/* 1. Header de Sección: El "Scanner" de Colección */}
            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 bg-zinc-950/40 border-l-4 border-yellow-400 p-6 md:p-10 backdrop-blur-md mb-8">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-yellow-400"></span>
                        Latest Drop 2026
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
                        Nueva <span className="text-zinc-600 group-hover:text-white transition-colors">Colección</span>
                    </h2>
                </div>

                {/* Contador Técnico (Detalle Pro) */}
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Displaying</p>
                    <p className="text-2xl font-black italic text-white tracking-tighter">04 / <span className="text-zinc-700">ITEMS</span></p>
                </div>
            </div>

            {/* 2. Grid de Productos: Densidad Shein con Estilo Cyber */}
            <div className='grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-4 px-4 md:px-0'>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* 3. Call To Action: "Ver Tienda" con Glow */}
            <div className="mt-16 flex justify-center pb-12">
                <Link
                    href="/products?take=10&skip=0"
                    className="group flex items-center gap-3 text-sm font-black italic uppercase tracking-widest text-white border border-white/10 px-12 py-5 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all duration-500 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
                >
                    Explorar Full Inventory
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </section>
    )
}