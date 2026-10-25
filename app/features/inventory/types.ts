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
    id: string;
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