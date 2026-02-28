// components/cart/ShoppingCart.tsx
"use client"

import { useStore } from "@/src/store";
import ShoppingCartItem from "@/components/cart/ShoppingCardItem";
import Amount from "@/components/cart/Amount";
import CouponForm from "@/components/cart/CouponForm";
import SubmitOrder from "@/components/cart/SubmitOrder";
import { ShoppingBag, Zap, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ShoppingCart() {
    const isCartOpen = useStore(state => state.isCartOpen);
    const toggleCart = useStore(state => state.toggleCart);
    const contents = useStore(state => state.contents);
    const total = useStore(state => state.total);
    const discount = useStore(state => state.discount);

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return null;

    return (
        <>
            {/* 1. FONDO OSCURO (Solo en móvil cuando está abierto) */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] transition-opacity duration-500 xl:hidden ${
                    isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleCart}
            />

            {/* 2. EL CARRITO (Aside) */}
            <aside
                className={`
                    /* En móvil: Panel que flota */
                    fixed inset-y-0 right-0 z-[100] w-full sm:w-[450px] 
                    transform transition-transform duration-500 ease-in-out
                    
                    /* En PC (XL): Se queda quieto a la derecha */
                    xl:relative xl:translate-x-0 xl:block
                    
                    /* Lógica de aparecer/desaparecer */
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}

                    /* Estilo Cyber VASK8 */
                    overflow-y-auto border-l border-white/10 
                    bg-zinc-950/98 backdrop-blur-3xl p-8 custom-scrollbar
                `}
            >
                {/* Cabecera del Panel */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Your Gear</h2>
                    <button onClick={toggleCart} className="xl:hidden text-zinc-500 hover:text-yellow-400">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {contents.length ? (
                    <div className="space-y-8">
                        <ul role="list" className="divide-y divide-white/5">
                            {contents.map(item => (
                                <ShoppingCartItem key={item.productId} item={item} />
                            ))}
                        </ul>

                        <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 space-y-4">
                            <dl className="space-y-3">
                                {discount > 0 && <Amount label="Descuento" amount={discount} discount={true} />}
                                <Amount label="Total" amount={total} />
                            </dl>
                            <div className="pt-4 border-t border-white/5">
                                <CouponForm />
                            </div>
                        </div>
                        <SubmitOrder />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <ShoppingBag className="h-10 w-10 text-zinc-700 mb-4" />
                        <p className="text-xl font-black italic uppercase text-white">Mochila vacía</p>
                    </div>
                )}
            </aside>
        </>
    );
}