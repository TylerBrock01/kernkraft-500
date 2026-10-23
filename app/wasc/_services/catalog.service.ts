import { cache } from "react";
import { isAxiosError } from "axios";
import { api } from "@/app/lib/axios/axios";
import { BUSINESS_SLUG } from "../_lib/config";
import {Property} from "@/app/wasc/_lib/property";

export interface CatalogResult {
    store: Record<string, unknown> | null;
    properties: Property[];
}

export async function getCatalog(slug: string, signal?: AbortSignal) {
    const { data } = await api.get(`/catalog/${slug}`, { signal });
    return {
        store: data.store ?? null,
        properties: (data.catalog?.data ?? []) as Property[],
    };
}

// cache() evita pedir lo mismo dos veces en un render (metadata + página)
export const getProduct = cache(async (id: string): Promise<Property | null> => {
    try {
        const { data } = await api.get(`/catalog/${BUSINESS_SLUG}/${id}`);
        return data.product ?? null;
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) return null;
        throw error; // errores reales (500, red caída) no deben verse como "no existe"
    }
});