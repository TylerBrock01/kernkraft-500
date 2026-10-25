import { api } from '@/app/lib/axios/axios';
import type {ProductDetail, ProductFormValues, ProductsPage} from '../types';
import {buildProductFormData} from "@/app/(dashboard)/dashboard/inventory/utils/product-form";

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
// Se mantiene explícito: la instancia `api` usa application/json por defecto
const MULTIPART = { headers: { 'Content-Type': 'multipart/form-data' } };

export async function uploadProductImages(files: File[]): Promise<string[]> {
    const body = new FormData();
    files.forEach((file) => body.append('files', file));

    const { data } = await api.post('/products/upload-images', body, MULTIPART);

    // Si tu backend responde con formas distintas, se normaliza SOLO aquí
    const urls: string[] = data.urls ?? (Array.isArray(data) ? data : [data.secure_url]);
    return urls.filter(Boolean).map((url) => url.replace(/\.(heic|heif)$/i, '.jpg'));
}

/** Crea el producto, o lo edita si se pasa `productId`. */
export async function saveProduct(values: ProductFormValues, productId?: string): Promise<void> {
    const body = buildProductFormData(values);
    if (productId) await api.patch(`/products/${productId}`, body, MULTIPART);
    else await api.post('/products', body, MULTIPART);
}