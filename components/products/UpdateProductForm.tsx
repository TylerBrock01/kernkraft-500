// components/products/UpdateProductForm.tsx
"use client"

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from 'next/navigation'
import { updateProduct } from "@/actions/update-product-action";
import { Save, RefreshCcw } from "lucide-react";

export default function UpdateProductForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    // Inyectamos el ID numérico al Server Action
    const updateProductWithId = updateProduct.bind(null, +id)

    const [state, dispatch] = useActionState(updateProductWithId, {
        errors: [],
        success: ''
    })

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
            {/* Renderizado de los inputs de ProductForm */}
            <div className="grid grid-cols-1 gap-2">
                {children}
            </div>

            {/* BOTÓN DE ACCIÓN: RECALIBRACIÓN */}
            <div className="pt-6 border-t border-white/5">
                <button
                    type="submit"
                    id="update-Product-Button"
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-yellow-400 text-black font-black italic uppercase text-sm -skew-x-12 hover:bg-white transition-all duration-300 shadow-[6px_6px_0px_rgba(255,255,255,0.05)] active:translate-y-1 active:shadow-none"
                >
                    <span className="transform skew-x-12 flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        Override_&_Sync_Settings
                    </span>
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
                    <RefreshCcw className="w-3 h-3 animate-spin-slow" />
                    <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
                        Waiting_for_Mainframe_Response
                    </p>
                </div>
            </div>
        </form>
    )
}