// app/admin/products/new/page.tsx
import Heading from "@/components/UI/Heading";
import Link from "next/link";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import { ArrowLeft, Cpu } from "lucide-react";

export default function NewProductPage() {
    return(
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Header de Navegación */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <Link
                    href="/admin/products?page=1"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Return_to_Inventory
                </Link>

                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/5">
                    <Cpu className="w-3 h-3 text-yellow-400" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">Status: Ready_to_Inject</span>
                </div>
            </div>

            <div className="relative border-l-4 border-yellow-400 pl-6">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                    Register_<span className="text-yellow-400">Hardware</span>
                </h1>
                <p className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest">
                    Introduce las especificaciones del nuevo equipo para el despliegue en tienda.
                </p>
            </div>

            {/* Formulario Estilo Terminal */}
            <div className="mt-10 bg-zinc-950/50 border border-white/5 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-yellow-400/5 pointer-events-none" />

                <AddProductForm>
                    <ProductForm/>
                </AddProductForm>
            </div>
        </div>
    )
}