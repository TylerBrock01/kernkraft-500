// /app/hmcs/_components/ProductCard.tsx
import type { Product } from "@/app/hmcs/_types/catalog";
import { formatPrice } from "@/app/hmcs/_lib/format";
import AddToOrderButton from "./AddToOrderButton";
import {getCategory} from "@/app/hmcs/_lib/product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div>
                {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="mb-4 h-36 w-full rounded-xl object-cover"
                    />
                ) : (
                    <div className="mb-4 flex h-36 w-full items-center justify-center rounded-xl bg-[#D9C5B2]/30">
                        {getCategory(product)}
                    </div>
                )}

                <h3 className="mb-1 text-lg font-bold text-[#1E1E1E]">{product.name}</h3>

                {product.description && (
                    <p className="mb-4 line-clamp-2 text-xs text-[#1E1E1E]/60">
                        {product.description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <span className="text-base font-bold text-[#2C4A3E]">
          {formatPrice(product.price)}
        </span>
                <AddToOrderButton product={product} />
            </div>
        </article>
    );
}