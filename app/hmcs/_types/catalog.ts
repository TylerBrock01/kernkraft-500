// /app/hmcs/_types/catalog.ts
export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    metadata: Record<string, unknown> | null;
}

export interface StoreInfo {
    name: string;
    // agrega aquí lo que venga: horarios, ubicación, etc.
    [key: string]: unknown;
}

export interface CatalogResult {
    store: StoreInfo | null;
    products: Product[];
}