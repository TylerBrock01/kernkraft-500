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