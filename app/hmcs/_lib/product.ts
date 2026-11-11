// /app/hmcs/_lib/product.ts
import type { Product } from "@/app/hmcs/_types/catalog";

export const DEFAULT_CATEGORY = "Otros";

/** Lee metadata.category de forma segura; si falta o no es texto, usa "Otros" */
export function getCategory(product: Pick<Product, "metadata">): string {
    const value = product.metadata?.category;
    return typeof value === "string" && value.trim() ? value.trim() : DEFAULT_CATEGORY;
}