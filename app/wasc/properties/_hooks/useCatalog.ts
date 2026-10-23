import { useEffect, useState } from "react";
import {CatalogResult, getCatalog} from "@/app/wasc/_services/catalog.service";

export function useCatalog(slug: string) {
    const [data, setData] = useState<CatalogResult>({ store: null, properties: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        setError(null);

        getCatalog(slug, controller.signal)
            .then(setData)
            .catch((err) => {
                if (controller.signal.aborted) return; // petición cancelada, no es error
                console.error("Error al obtener el catálogo:", err);
                setError("No se pudieron cargar las propiedades en este momento.");
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsLoading(false);
            });

        return () => controller.abort();
    }, [slug]);

    return { ...data, isLoading, error };
}