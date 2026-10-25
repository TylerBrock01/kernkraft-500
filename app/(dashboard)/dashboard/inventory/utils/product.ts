import {ProductDetail} from "@/app/features/inventory/types";

export const LOW_STOCK_THRESHOLD = 5;
export type StockLevel = 'ok' | 'low' | 'out';

export function getStockLevel(stock: number): StockLevel {
    if (stock <= 0) return 'out';
    if (stock <= LOW_STOCK_THRESHOLD) return 'low';
    return 'ok';
}
/** Unifica `images` e `image` en una sola lista. */
export function getProductImages(product: Pick<ProductDetail, 'image' | 'images'>): string[] {
    if (product.images?.length) return product.images;
    return product.image ? [product.image] : [];
}

export function formatMetadataValue(value: unknown): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}