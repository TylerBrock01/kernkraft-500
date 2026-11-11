// /app/hmcs/_components/CartDrawer.tsx
"use client";

import { useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/app/hmcs/_context/CartContext";
import { formatPrice } from "@/app/hmcs/_lib/format";
import {buildWhatsAppUrl} from "@/app/hmcs/_lib/whatssap";

export default function CartDrawer() {
    const { cart, isCartOpen, closeCart, increase, decrease, totalPrice, totalItems } = useCart();

    // Escape para cerrar + bloquear scroll del fondo mientras está abierto
    useEffect(() => {
        if (!isCartOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeCart;
        };
        document.addEventListener("keydown", onKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isCartOpen, closeCart]);

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        const url = buildWhatsAppUrl(cart, totalPrice);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-0 z-[60] overflow-hidden"
        >
            {/* Overlay */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={closeCart}
            />

            <div className="absolute inset-y-0 right-0 flex h-dvh max-w-full pl-10">
                <div className="flex w-screen max-w-md flex-col bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 bg-[#F8F9FA] p-6">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-[#2C4A3E]" aria-hidden="true" />
                            <h2 id="cart-title" className="text-xl font-bold text-[#1E1E1E]">
                                Tu pedido ({totalItems})
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={closeCart}
                            aria-label="Cerrar pedido"
                            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E]"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Lista */}
                    <div className="flex-1 space-y-4 overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                                <ShoppingBag className="mb-3 h-12 w-12 stroke-[1.5]" aria-hidden="true" />
                                <p className="font-medium text-gray-600">Tu carrito está vacío</p>
                                <p className="text-sm">Agrega unos tacos o bebidas para comenzar.</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-[#F8F9FA] p-3"
                                    >
                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-semibold text-[#1E1E1E]">
                                                {`${item.name}`}
                                            </h3>
                                            <span className="text-xs font-bold text-[#2C4A3E]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                                        </div>

                                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1">
                                            <button
                                                type="button"
                                                onClick={() => decrease(item.id)}
                                                aria-label={
                                                    item.quantity === 1
                                                        ? `Quitar ${item.name}`
                                                        : `Disminuir cantidad de ${item.name}`
                                                }
                                                className="p-1 transition-colors hover:text-red-600"
                                            >
                                                {item.quantity === 1 ? (
                                                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                                ) : (
                                                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                                                )}
                                            </button>

                                            <span className="w-4 text-center text-sm font-bold" aria-live="polite">
                        {item.quantity}
                      </span>

                                            <button
                                                type="button"
                                                onClick={() => increase(item.id)}
                                                aria-label={`Aumentar cantidad de ${item.name}`}
                                                className="p-1 transition-colors hover:text-[#2C4A3E]"
                                            >
                                                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="space-y-4 border-t border-gray-100 bg-white p-6">
                            <div className="flex items-center justify-between text-lg font-bold">
                                <span className="text-[#1E1E1E]">Total</span>
                                <span className="text-[#2C4A3E]">{formatPrice(totalPrice)}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCheckout}
                                className="w-full rounded-xl bg-[#2C4A3E] py-3.5 font-bold text-white shadow-md transition-all hover:bg-[#1f352c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E] active:scale-[0.98]"
                            >
                                Enviar pedido por WhatsApp
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}