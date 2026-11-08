// /hmcs/_lib/catalog.ts
import { cache } from "react";
import { isAxiosError } from "axios";
import {CatalogResult, Product} from "@/app/hmcs/_types/catalog";
import {api} from "@/app/lib/axios/axios";

export const BUSINESS_SLUG = "hmcs"; // ajusta al slug real

export const getCatalog = cache(
    async (slug: string = BUSINESS_SLUG): Promise<CatalogResult> => {
        const { data } = await api.get(`/catalog/${slug}`);
        return {
            store: data.store ?? null,
            products: (data.catalog?.data ?? []) as Product[],
        };
    }
);

export const getProduct = cache(
    async (id: string): Promise<Product | null> => {
        try {
            const { data } = await api.get(`/catalog/${BUSINESS_SLUG}/${id}`);
            return data.product ?? null;
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) return null;
            throw error; // 500 o red caída no deben verse como "no existe"
        }
    }
);