'use client';

import { useState, useEffect, useCallback } from 'react';
import {publicApi} from '@/app/lib/axios/axios';

// Tipados para TypeScript
interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    slug: string;
}

interface StoreInfo {
    name: string;
    type: string;
    contact: any;
}

export function useCatalog(tenantSlug: string) {
    // 🧠 Estado de Datos
    const [store, setStore] = useState<StoreInfo | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState({ total: 0, page: 1, lastPage: 1, hasSearch: false });

    // 🚦 Estado de UI
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 🎛️ Controles del Usuario
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // 🛡️ CTO Trick: DEBOUNCE
    // Esperamos 500ms después de que el usuario deja de teclear para buscar.
    // Esto salva a tu servidor de colapsar.
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchInput);
            setPage(1); // Si busca algo nuevo, lo regresamos a la página 1
        }, 500);

        return () => clearTimeout(handler);
    }, [searchInput]);

    // 📡 Llamada al Backend
    const fetchCatalog = useCallback(async () => {
        if (!tenantSlug) return;

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '12',
                ...(debouncedSearch && { search: debouncedSearch }) // Solo se envía si hay texto
            });

            const response = await publicApi.get(`/catalog/${tenantSlug}?${params}`);
            setStore(response.data.store);
            setProducts(response.data.catalog.data);
            setMeta(response.data.catalog.meta);
        } catch (err: any) {
            console.error('Error cargando el catálogo:', err);
            setError(err?.response?.data?.message || 'Error al conectar con la tienda.');
        } finally {
            setIsLoading(false);
        }
    }, [tenantSlug, page, debouncedSearch]);

    // Disparar la búsqueda cuando cambia la página o el término debounced
    useEffect(() => {
        fetchCatalog();
    }, [fetchCatalog]);

    // 📦 Empaquetamos todo lo que el componente visual necesita
    return {
        store,
        products,
        meta,
        isLoading,
        error,
        page,
        setPage,
        searchInput,
        setSearchInput,
    };
}