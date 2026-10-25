'use client';

import { useCallback, useEffect, useState } from 'react';
import { isAxiosError, isCancel } from 'axios';
import { getProductById, setProductActive } from '../services/inventory.service';
import type { ProductDetail } from '../types';

export function useProduct(id: string) {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    const [isToggling, setIsToggling] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    // Carga inicial (cambia el id o se pide reintentar): aquí sí se muestra el loader de página
    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        setNotFound(false);
        setError(null);

        getProductById(id, controller.signal)
            .then(setProduct)
            .catch((err) => {
                if (isCancel(err) || controller.signal.aborted) return;
                if (isAxiosError(err) && err.response?.status === 404) {
                    setProduct(null);
                    setNotFound(true);
                    return;
                }
                console.error('Error obteniendo producto:', err);
                setError('No se pudo cargar el producto.');
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsLoading(false);
            });

        return () => controller.abort();
    }, [id, reloadKey]);

    /** Recarga silenciosa: actualiza los datos sin desmontar la página ni el drawer. */
    const refresh = useCallback(async () => {
        try {
            setProduct(await getProductById(id));
        } catch (err) {
            console.error('Error recargando producto:', err);
            setActionError('No se pudo actualizar la información. Recarga la página.');
        }
    }, [id]);

    const toggleActive = useCallback(async () => {
        if (!product || isToggling) return;
        setIsToggling(true);
        setActionError(null);
        try {
            await setProductActive(id, !product.isActive);
            await refresh();
        } catch (err) {
            console.error('Error cambiando el estado:', err);
            setActionError('No se pudo cambiar el estado del producto.');
        } finally {
            setIsToggling(false);
        }
    }, [id, product, isToggling, refresh]);

    const retry = useCallback(() => setReloadKey((k) => k + 1), []);

    return { product, isLoading, notFound, error, actionError, isToggling, toggleActive, refresh, retry };
}