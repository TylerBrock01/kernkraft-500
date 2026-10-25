import { api } from '@/app/lib/axios/axios';
import type { ProductsPage } from '../types';

export interface ListProductsParams {
    take: number;
    skip: number;
    search?: string;
}

export async function listProducts(
    params: ListProductsParams,
    signal?: AbortSignal,
): Promise<ProductsPage> {
    const { data } = await api.get<ProductsPage>('/products', { params, signal });
    return data;
}