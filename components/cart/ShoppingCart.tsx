// components/cart/ShoppingCart.tsx
"use client"

import { useStore } from "@/src/store";
import ShoppingCartItem from "@/components/cart/ShoppingCardItem";
import Amount from "@/components/cart/Amount";
import CouponForm from "@/components/cart/CouponForm";
import SubmitOrder from "@/components/cart/SubmitOrder";
import { ShoppingBag, Zap } from "lucide-react";
import {useEffect, useState} from "react";

export function ShoppingCart() {
    // const contents = useStore((state) => state.contents)
    const total: number = useStore(state => state.total)
    const discount: number = useStore(state => state.discount)
    const [isHydrated, setIsHydrated] = useState(false)
    const contents = useStore(state => state.contents)

    // Solo mostramos contenido cuando el cliente está listo
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    if (!isHydrated) return null // O tu loading de VASK8
    return (
        <div className="flex flex-col h-full">
            {contents.length ? (
                <div className="space-y-8">
                    {/* Header Interno: Status del Inventario */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                            Current Inventory / {contents.length} Items
                        </p>
                        <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </div>

                    {/* Lista de Items: Separación Industrial */}
                    <ul role="list" className="divide-y divide-white/5">
                        {contents.map(item => (
                            <ShoppingCartItem
                                key={item.productId}
                                item={item}
                            />
                        ))}
                    </ul>

                    {/* Desglose de Costos: Estilo Dashboard */}
                    <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <dl className="space-y-3">
                            {discount > 0 && (
                                <Amount label="Descuento Aplicado" amount={discount} discount={true} />
                            )}
                            <Amount label="Total del Equipo" amount={total} />
                        </dl>

                        <div className="pt-4 border-t border-white/5">
                            <CouponForm />
                        </div>
                    </div>

                    {/* Botón de Acción Final */}
                    <div className="pb-10">
                        <SubmitOrder />
                    </div>
                </div>
            ) : (
                /* Estado Vacío: Estética "Street" */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <div className="p-6 bg-zinc-900/50 rounded-full border border-white/5">
                        <ShoppingBag className="h-10 w-10 text-zinc-700" />
                    </div>
                    <div>
                        <p className="text-xl font-black italic uppercase tracking-tighter text-white">
                            Tu mochila está vacía
                        </p>
                        <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-2">
                            Sal a la calle y elige tu tabla.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}