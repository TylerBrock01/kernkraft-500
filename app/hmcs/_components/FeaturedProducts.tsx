// /app/hmcs/_components/FeaturedProducts.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/app/hmcs/_types/catalog";
import { isFeatured } from "@/app/hmcs/_lib/product";
import ProductCard from "./ProductCard";

const MAX_FEATURED = 3;

export default function FeaturedProducts({ products }: { products: Product[] }) {
    const featured = products.filter(isFeatured).slice(0, MAX_FEATURED);

    // Sin destacados, la sección no se muestra (no queda un hueco vacío)
    if (featured.length === 0) return null;

    return (
        <section
            aria-labelledby="featured-title"
            className="bg-[#F8F9FA] py-16"
        >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <h2
                        id="featured-title"
                        className="text-3xl font-extrabold tracking-tight text-[#1E1E1E]"
                    >
                        Los favoritos
                    </h2>
                    <Link
                        href="/hmcs/quickcategory"
                        className="flex items-center gap-1 text-sm font-semibold text-[#2C4A3E] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E]"
                    >
                        Ver todo
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>

                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((product) => (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}