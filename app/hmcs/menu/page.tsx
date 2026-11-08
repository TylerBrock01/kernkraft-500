// /app/hmcs/menu/page.tsx

import {getCatalog} from "@/app/hmcs/_lib/catalog";
import ProductCard from "@/app/hmcs/_components/ProductCard";

export const revalidate = 60;

export default async function MenuPage() {
    const { products } = await getCatalog();
    const available = products.filter((p) => p);

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-[#1E1E1E]">
                Menú
            </h1>

            {available.length === 0 ? (
                <p className="text-[#1E1E1E]/70">
                    No hay productos disponibles por el momento.
                </p>
            ) : (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {available.map((product) => (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}