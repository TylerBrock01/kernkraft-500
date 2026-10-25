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