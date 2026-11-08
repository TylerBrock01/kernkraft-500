// /app/hmcs/_lib/filters.ts
import type { Product } from "@/app/hmcs/_types/catalog";

interface BaseFilter {
    id: string;
    label: string;
    key: string; // clave dentro de product.metadata
}

/** metadata[key] === true */
interface FlagFilter extends BaseFilter {
    kind: "flag";
}

/** metadata[key] es un arreglo que contiene `value` */
interface IncludesFilter extends BaseFilter {
    kind: "includes";
    value: string;
}

export type ProductFilter = FlagFilter | IncludesFilter;

export const PRODUCT_FILTERS = [
    { id: "taco", label: "taco", kind: "flag", key: "taco" },
    // { id: "spicy", label: "Picante", kind: "flag", key: "spicy" },
    // { id: "gluten-free", label: "Sin gluten", kind: "includes", key: "tags", value: "gluten-free" },
] as const satisfies readonly ProductFilter[];

export function matchesFilter(product: Product, filter: ProductFilter): boolean {
    const value = product.metadata?.[filter.key];

    if (filter.kind === "flag") return value === true;
    return Array.isArray(value) && value.includes(filter.value);
}