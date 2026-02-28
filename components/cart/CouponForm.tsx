// components/cart/CouponForm.tsx
"use client"

import { FormEvent } from "react";
import { useStore } from "@/src/store";
import { Ticket, ChevronRight } from "lucide-react";

export default function CouponForm() {
    const applyCoupon = useStore(state => state.applyCoupon)
    const coupon = useStore(state => state.coupon)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const couponName = formData.get('coupon_name') as string
        if (!couponName) return
        await applyCoupon(couponName)
    }

    return (
        <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 mb-4">
                <Ticket className="h-3 w-3 text-zinc-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                    Promo_Protocol / Acceso
                </p>
            </div>

            <form
                className="flex group"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="coupon_name"
                    placeholder="INGRESA TU CÓDIGO"
                    className="flex-1 bg-zinc-950 border border-white/10 p-3 text-[10px] font-bold text-white uppercase tracking-widest focus:border-yellow-400/50 outline-none transition-all placeholder:text-zinc-700"
                />
                <button
                    type="submit"
                    className="bg-yellow-400 text-black px-4 flex items-center justify-center hover:bg-yellow-300 transition-colors group-active:scale-95 transition-transform"
                >
                    <ChevronRight className="h-5 w-5 stroke-[3px]" />
                </button>
            </form>

            {/* Mensajes de Sistema */}
            {coupon.message && (
                <div className="mt-3 py-2 px-3 bg-zinc-900/50 border border-white/5 rounded-md">
                    <p className={`text-[10px] font-black uppercase tracking-tighter text-center ${
                        coupon.message.toLowerCase().includes('error') || coupon.message.toLowerCase().includes('no')
                            ? 'text-red-500'
                            : 'text-yellow-400 animate-pulse'
                    }`}>
                        {`> ${coupon.message}`}
                    </p>
                </div>
            )}
        </div>
    )
}