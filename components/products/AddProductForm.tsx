// components/products/AddProductForm.tsx
"use client"

import { useActionState, useEffect } from "react";
import { addProduct } from "@/actions/add-product-action";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { Plus } from "lucide-react";

export default function AddProductForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const [state, dispatch] = useActionState(addProduct, {
        errors: [],
        success: ''
    });

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error));
        }
        if (state.success) {
            toast.success(state.success)
            router.push("/admin/products");
        }
    }, [state, router])

    return (
        <form
            className="space-y-10 relative z-10"
            action={dispatch}
        >
            {/* El contenido del formulario (ProductForm) ya viene estilizado */}
            <div className="grid grid-cols-1 gap-8">
                {children}
            </div>

            {/* Botón de Acción Final: Estilo VASK8 Industrial */}
            <div className="pt-6 border-t border-white/5">
                <button
                    type="submit"
                    id="submitProductButton"
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-yellow-400 text-black font-black italic uppercase text-sm -skew-x-12 hover:bg-white transition-all duration-300 shadow-[6px_6px_0px_rgba(255,255,255,0.05)] active:translate-y-1 active:shadow-none"
                >
                    <span className="transform skew-x-12 flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Inject_New_Hardware
                    </span>
                </button>

                <p className="text-center text-[9px] font-mono text-zinc-600 mt-4 uppercase tracking-[0.2em]">
                    Confirmar entrada de datos en Render_Mainframe
                </p>
            </div>
        </form>
    )
}