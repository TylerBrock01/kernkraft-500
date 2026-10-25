import { api } from '@/app/lib/axios/axios';
import type { ProductDetail, ProductsPage } from '../types';

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

export async function getProductById(id: string, signal?: AbortSignal): Promise<ProductDetail> {
    const { data } = await api.get<ProductDetail>(`/products/${id}`, { signal });
    return data;
}

export async function setProductActive(id: string, isActive: boolean): Promise<void> {
    // JSON simple (no FormData): el ValidationPipe de Nest lo procesa aunque la ruta tenga FileInterceptor
    await api.patch(`/products/${id}`, { isActive });
}