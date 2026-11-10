"use client";

import { Plus } from "lucide-react";
import type { Product } from "@/app/hmcs/_types/catalog";
import { useCart } from "@/app/hmcs/_context/CartContext";

export default function AddToOrderButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Agregar ${product.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F9FA] text-[#2C4A3E] transition-colors duration-200 hover:bg-[#2C4A3E] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E] active:scale-95 active:bg-[#2C4A3E] active:text-white group-hover:bg-[#2C4A3E] group-hover:text-white"
        >
            <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
    );
}