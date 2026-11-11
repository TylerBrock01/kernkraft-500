// /app/hmcs/_types/catalog.ts
export interface ProductMetadata {
    category?: string;
    vegetarian?: boolean;
    spicy?: boolean;
    tags?: string[];
    [key: string]: unknown; // permite claves extra sin romper el tipo
}

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    metadata: ProductMetadata | null;
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