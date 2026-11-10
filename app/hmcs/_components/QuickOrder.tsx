// /app/hmcs/_components/QuickOrder.tsx
"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import type { Product } from "@/app/hmcs/_types/catalog";
import { PRODUCT_FILTERS, matchesFilter } from "@/app/hmcs/_lib/filters";
import ProductCard from "./ProductCard";
import {getCategory} from "@/app/hmcs/_lib/product";

const ALL = "all";

// Quita acentos y mayúsculas: "Café" y "cafe" coinciden
const normalize = (text: string) =>
    text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function QuickOrder({ products }: { products: Product[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(ALL);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const toggleFilter = (id: string) =>
        setActiveFilters((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );

    // Categorías reales, sin repetir, en el orden en que llegan
    const categories = useMemo(
        () => [ALL, ...Array.from(new Set(products.map(getCategory)))],
        [products]
    );

    // Solo mostrar filtros que al menos un producto cumple (evita chips vacíos)
    const availableFilters = useMemo(
        () => PRODUCT_FILTERS.filter((f) => products.some((p) => matchesFilter(p, f))),
        [products]
    );

    const filteredProducts = useMemo(() => {
        const query = normalize(searchQuery.trim());
        const selected = PRODUCT_FILTERS.filter((f) => activeFilters.includes(f.id));

        return products.filter((p) => {
            const matchesCategory =
                activeCategory === ALL || getCategory(p) === activeCategory;            const matchesSearch =
                !query || normalize(`${p.name} ${p.description ?? ""}`).includes(query);
            const matchesMetadata = selected.every((f) => matchesFilter(p, f));
            return matchesCategory && matchesSearch && matchesMetadata;
        });
    }, [products, searchQuery, activeCategory, activeFilters]);

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-4 font-sans text-[#1E1E1E] sm:p-8">
            <div className="mx-auto max-w-5xl">
                {/* Cabecera */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold">Haz tu pedido rápido</h1>
                        <p className="text-sm text-[#1E1E1E]/60">
                            Selecciona tu categoría, pide y pasa a recoger.
                        </p>
                    </div>
                </div>

                {/* Búsqueda */}
                <div className="relative mb-6">
                    <Search
                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E1E1E]/40"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        aria-label="Buscar productos"
                        placeholder="Busca un taco, torta o bebida..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm transition-colors focus:border-[#2C4A3E] focus:outline-none"
                    />
                </div>

                {/* Categorías */}
                <div
                    role="tablist"
                    aria-label="Categorías"
                    className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-4"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E] ${
                                activeCategory === cat
                                    ? "bg-[#2C4A3E] text-white shadow-md shadow-[#2C4A3E]/20"
                                    : "border border-gray-200 bg-white text-[#1E1E1E]/70 hover:border-[#2C4A3E]/50"
                            }`}
                        >
                            {cat === ALL ? "Todos" : cat}
                        </button>
                    ))}
                </div>

                {/* Filtros de metadata */}
                {availableFilters.length > 0 && (
                    <div
                        role="group"
                        aria-label="Filtros"
                        className="mb-8 flex flex-wrap gap-2"
                    >
                        {availableFilters.map((f) => {
                            const active = activeFilters.includes(f.id);
                            return (
                                <button
                                    key={f.id}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => toggleFilter(f.id)}
                                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E] ${
                                        active
                                            ? "border-[#2C4A3E] bg-[#D9C5B2]/40 text-[#2C4A3E]"
                                            : "border-gray-200 bg-white text-[#1E1E1E]/70 hover:border-[#2C4A3E]/50"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Productos */}
                {filteredProducts.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <li key={product.id}>
                                <ProductCard product={product} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="py-12 text-center text-[#1E1E1E]/50">
                        No encontramos productos en esta búsqueda o categoría.
                    </p>
                )}
            </div>
        </div>
    );
}