"use client"
import Logo from "@/components/UI/Logo";
import {Heart, Search, ShoppingBag, UserCircle, Zap} from "lucide-react";
import Link from "next/link";
import {useStore} from "@/src/store";

// components/UI/Header.tsx
export default function Header() {
    const toggleCart = useStore(state => state.toggleCart);
    const contents = useStore(state => state.contents);
    const itemsCount = contents.length;

    return (
        <header className="flex flex-col w-full sticky top-0 z-50">

            {/* --- CAPA 0: Top Bar (Anuncios / Promo) --- */}
            <div className="bg-yellow-400 py-2 px-4 flex items-center justify-center gap-3 overflow-hidden">
                <Zap className="h-3 w-3 text-black fill-black animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black whitespace-nowrap">
                    Global Shipping — Free over $120 — <span className="underline cursor-pointer">Shop Now</span>
                </p>
                <Zap className="h-3 w-3 text-black fill-black animate-pulse" />
            </div>

            {/* --- CAPA 1: Main Bar (Identidad y Acciones) --- */}
            <div className="h-20 flex items-center justify-between px-6 md:px-12 bg-black/90 backdrop-blur-md border-b border-white/5">
                <Logo />

                {/* Search Bar - Estilo Omnibox */}
                <div className="hidden lg:flex flex-1 max-w-md mx-10 relative group">
                    <input
                        type="text"
                        placeholder="Search Nyjah, Element, Trucks..."
                        className="w-full bg-zinc-900 border border-white/10 py-2 px-5 rounded-full text-xs
                       focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 outline-none transition-all"
                    />
                    <Search className="absolute right-4 top-2.5 h-4 w-4 text-zinc-600 group-focus-within:text-yellow-400" />
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-6 text-white/80">
                    {/* Link al Admin/Perfil */}
                    <Link href={'/admin/sales'}>
                        <UserCircle className="h-6 w-6 hover:text-yellow-400 cursor-pointer transition-colors" />
                    </Link>

                    {/* BOTÓN DEL CARRITO */}
                    <div
                        className="relative group cursor-pointer"
                        onClick={toggleCart} // 👈 ¡Aquí es donde conectas el 'maldito' interruptor!
                    >
                        <ShoppingBag className="h-6 w-6 group-hover:text-yellow-400 transition-colors" />

                        {/* 3. Solo mostramos el badge si hay algo en el carrito */}
                        {itemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                        {itemsCount}
                    </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}