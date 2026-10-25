export interface Product {
    metadata: any;
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    type: string;
}

export interface ProductsPage {
    products: Product[];
    total: number;
}

export interface ProductDetail {
    id: number; // antes: string
    name: string;
    slug: string;
    type?: string | null;
    price: number | string; // los decimales suelen llegar como string
    description?: string | null;
    stock: number;
    isActive: boolean;
    image?: string | null;
    images?: string[];
    metadata?: Record<string, unknown> | null;
}

export const PRODUCT_TYPES = ['retail', 'food', 'service'] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export interface MetadataRow {
    id: string; // llave estable para React (el índice se desalinea al borrar filas)
    key: string;
    value: string;
}

/** Valores del formulario. Precio y stock son texto para poder borrar el campo mientras se escribe. */
export interface ProductFormValues {
    name: string;
    description: string;
    price: string;
    stock: string;
    type: ProductType;
    images: string[];
    metadata: MetadataRow[];
}
/** Lo mínimo que necesita el modal de merma */
export type AdjustableProduct = Pick<ProductDetail, 'id' | 'name' | 'stock'>;

// ⚠️ Verifica que los `id` coincidan con el enum de tu backend
export const STOCK_ADJUSTMENT_REASONS = [
    { id: 'DAMAGE', label: 'Dañado / Roto' },
    { id: 'THEFT', label: 'Robo' },
    { id: 'EXPIRATION', label: 'Caducado' },
    { id: 'LOSS', label: 'Extraviado' },
    { id: 'INTERNAL_USE', label: 'Uso interno' },
    { id: 'OTHER', label: 'Otro' },
] as const;

export type StockAdjustmentReason = (typeof STOCK_ADJUSTMENT_REASONS)[number]['id'];