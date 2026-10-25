'use client';

import { useCallback, useEffect, useState } from 'react';
import { isCancel } from 'axios';
import { listProducts } from '../services/inventory.service';
import type { Product } from '../types';

export const PAGE_SIZE = 10;

export function useInventory() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        setError(null);

        listProducts({ take: PAGE_SIZE, skip, search }, controller.signal)
            .then((page) => {
                setProducts(page.products);
                setTotal(page.total);
            })
            .catch((err) => {
                if (isCancel(err) || controller.signal.aborted) return; // petición reemplazada: no es un error
                console.error('Error obteniendo inventario:', err);
                setError('No se pudo cargar el inventario.');
            })
            .finally(() => {
                // Si fue cancelada, ya hay otra en vuelo y ella apagará el loading
                if (!controller.signal.aborted) setIsLoading(false);
            });

        return () => controller.abort(); // al cambiar skip/search o desmontar, cancela la anterior
    }, [skip, search, reloadKey]);

    const handleSearch = useCallback((term: string) => {
        setSearch(term);
        setSkip(0);
    }, []);

    const nextPage = useCallback(() => setSkip((s) => s + PAGE_SIZE), []);
    const prevPage = useCallback(() => setSkip((s) => Math.max(0, s - PAGE_SIZE)), []);

    /** Reintenta la página actual. */
    const retry = useCallback(() => setReloadKey((k) => k + 1), []);

    /** Vuelve a la página 1 y recarga (p. ej. tras crear un producto). */
    const reloadFromStart = useCallback(() => {
        setSkip(0);
        setReloadKey((k) => k + 1); // necesario: si skip ya era 0, el efecto no se dispararía solo
    }, []);

    return {
        products,
        total,
        skip,
        take: PAGE_SIZE,
        hasMore: skip + PAGE_SIZE < total,
        isLoading,
        error,
        handleSearch,
        nextPage,
        prevPage,
        retry,
        reloadFromStart,
    };
}