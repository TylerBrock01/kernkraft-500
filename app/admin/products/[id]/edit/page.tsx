// app/admin/products/[id]/edit/page.tsx
import Link from "next/link";
import ProductForm from "@/components/products/ProductForm";
import UpdateProductForm from "@/components/products/UpdateProductForm";
import { notFound } from "next/navigation";
import { ProductSchema } from "@/src/schema";
import { ArrowLeft, Settings2, Terminal } from "lucide-react";

async function getProduct(id: string) {
    const url = `${process.env.API_URL}/products/${id}`;
    const request = await fetch(url);
    const json = await request.json();
    if (!request.ok) {
        notFound()
    }
    return ProductSchema.parse(json);
}

type Params = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: Params }) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header de Navegación Táctica */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <Link
                    href="/admin/products?page=1"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Return_to_Inventory
                </Link>

                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/5">
                    <Settings2 className="w-3 h-3 text-yellow-400 animate-spin-slow" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">System_Mode: Edit_Hardware</span>
                </div>
            </div>

            {/* Título Industrial */}
            <div className="relative border-l-4 border-yellow-400 pl-6">
                <div className="flex items-center gap-3 mb-2">
                    <Terminal className="w-5 h-5 text-yellow-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                        Object_ID: {product.id.toString().slice(0, 12)}...
                    </span>
                </div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                    Edit_<span className="text-yellow-400">{product.name}</span>
                </h1>
                <p className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest leading-relaxed">
                    Modificando especificaciones en el Mainframe. Los cambios serán inyectados instantáneamente.
                </p>
            </div>

            {/* Contenedor del Formulario */}
            <div className="mt-10 bg-zinc-950/50 border border-white/5 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-yellow-400/5 pointer-events-none" />

                <UpdateProductForm>
                    <ProductForm product={product} />
                </UpdateProductForm>
            </div>
        </div>
    );
}