"use client"

import { FormEvent } from "react";
import { useStore } from "@/src/store";
import { Ticket, ChevronRight } from "lucide-react";

export default function CouponForm() {
    // 1. Extraemos el total y la función de aplicación del store
    const applyCoupon = useStore(state => state.applyCoupon)
    const coupon = useStore(state => state.coupon)
    const total = useStore(state => state.total) // <-- Necesario para el backend
    const removeCoupon = useStore(state => state.removeCoupon) // <-- Para limpiar el estado

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const couponName = formData.get('coupon_name') as string

        if (!couponName) return

        // 2. Inyectamos nombre Y total al protocolo de aplicación
        await applyCoupon({
            coupon_name: couponName,
            total: total
        })
    }

    return (
        <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Ticket className="h-3 w-3 text-zinc-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                        Promo_Protocol / Acceso
                    </p>
                </div>
                {/* Botón para remover cupón si ya hay uno aplicado */}
                {coupon.id !== 0 && (
                    <button
                        onClick={removeCoupon}
                        className="text-[8px] font-black uppercase text-red-500/50 hover:text-red-500 transition-colors"
                    >
                        [ Terminar_Sesión_Cupón ]
                    </button>
                )}
            </div>

            <form
                className="flex group"
                onSubmit={handleSubmit}
            >
                <input
                    id={'coupon-input'}
                    type="text"
                    name="coupon_name"
                    placeholder={coupon.id !== 0 ? `ACTIVO: ${coupon.name}` : "INGRESA TU CÓDIGO"}
                    disabled={coupon.id !== 0}
                    className="flex-1 bg-zinc-950 border border-white/10 p-3 text-[10px] font-bold text-white uppercase tracking-widest focus:border-yellow-400/50 outline-none transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    id={'coupon-submit'}
                    type="submit"
                    disabled={coupon.id !== 0}
                    className="bg-yellow-400 text-black px-4 flex items-center justify-center hover:bg-yellow-300 transition-colors group-active:scale-95 transition-transform disabled:bg-zinc-800 disabled:text-zinc-600"
                >
                    <ChevronRight className="h-5 w-5 stroke-[3px]" />
                </button>
            </form>

            {/* Mensajes de Sistema: Feedback Táctico */}
            {coupon.message && (
                <div className={`mt-3 py-2 px-3 border rounded-sm transition-all duration-500 ${
                    coupon.id === 0
                        ? 'bg-red-500/10 border-red-500/20'
                        : 'bg-green-500/10 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                }`}>
                    <p className={`text-[10px] font-black uppercase tracking-tighter text-center ${
                        coupon.id === 0 ? 'text-red-500' : 'text-green-400'
                    }`}>
                        {`> ${coupon.message}`}
                    </p>
                </div>
            )}
        </div>
    )
}