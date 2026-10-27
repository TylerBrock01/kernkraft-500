// /hmcs/_components/HmcsNavBar.tsx
"use client";

import Link from "next/link";
import { Leaf, ShoppingBag } from "lucide-react";

interface HmcsNavBarProps {
    /** Cantidad de productos en la orden */
    itemCount?: number;
    /** Se ejecuta al presionar "Mi Orden" (ej. abrir un drawer) */
    onOrderClick?: () => void;
}

export default function HmcsNavBar({
                                       itemCount = 0,
                                       onOrderClick,
                                   }: HmcsNavBarProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-[#2C4A3E]/10 bg-white/80 backdrop-blur">
            <nav
                aria-label="Navegación principal"
                className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
            >
                {/* Logo */}
                <Link
                    href="/hmcs"
                    className="flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2C4A3E]"
                >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2C4A3E]">
            <Leaf className="h-4 w-4 text-[#2C4A3E]" aria-hidden="true" />
          </span>
                    <span className="font-sans text-xl font-bold tracking-tight text-[#2C4A3E]">
            Las Hamacas
          </span>
                </Link>

                {/* Botón de orden */}
                <button
                    type="button"
                    onClick={onOrderClick}
                    aria-label={`Mi orden, ${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
                    className="relative flex items-center gap-2 rounded-full border-2 border-[#2C4A3E] bg-[#F8F9FA] px-4 py-2 font-medium text-[#2C4A3E] transition-colors duration-300 hover:bg-[#2C4A3E] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E]"
                >
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Mi Orden</span>

                    {itemCount > 0 && (
                        <span
                            aria-hidden="true"
                            className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2C4A3E] px-1 text-xs font-bold text-white ring-2 ring-white"
                        >
              {itemCount}
            </span>
                    )}
                </button>
            </nav>
        </header>
    );
}