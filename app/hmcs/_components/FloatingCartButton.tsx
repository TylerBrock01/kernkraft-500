"use client";

import React from "react";
import { useCart } from "@/app/hmcs/_context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function FloatingCartButton() {
    const { totalItems, setIsCartOpen, totalPrice } = useCart();

    if (totalItems === 0) return null;

    return (
        <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-0 z-40 bg-[#2C4A3E]  px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-[#1f352c] transition-all active:scale-95 border-2 border-[#D9C5B2]"
        >
            <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-[#D9C5B2] text-[#1E1E1E] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
            </div>
            <span className="font-bold text-sm">Ver Pedido (${totalPrice.toFixed(2)})</span>
        </button>
    );
}