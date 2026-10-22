'use client';

import { useState, useEffect, useCallback } from "react";
import { api } from "@/app/lib/axios/axios"; // Usamos tu cliente configurado de Axios
import { PropertyCard } from "@/app/wasc/components/PropertyCard";

// Slug del negocio/tenant que quieres consultar
const BUSINESS_SLUG = "wasc"; // Ajusta según el slug de tu negocio en BD

const propertyTypes = ["Todos", "Casa", "Departamento", "Terreno","Lote", "Comercial"] as const;

export default function Properties() {
    const [selectedType, setSelectedType] = useState<string>("Todos");
    const [properties, setProperties] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [storeInfo, setStoreInfo] = useState<any>(null);

    // Fetch del catálogo desde el backend
    const fetchCatalog = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`/catalog/${BUSINESS_SLUG}`);

            // 🎯 Extraemos la tienda y el catálogo según la estructura real que mandó el backend
            const storeData = response.data.store;
            const productsData = response.data.catalog?.data || [];

            setStoreInfo(storeData);
            setProperties(productsData);
        } catch (err) {
            console.error("Error al obtener el catálogo:", err);
            setError("No se pudieron cargar las propiedades en este momento.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchCatalog();
    }, [fetchCatalog]);

    // Filtrado dinámico por el atributo "type" de la metadata o el campo directo de la entidad
    const filteredProperties = selectedType === "Todos"
        ? properties
        : properties.filter((item) => {
            // Revisa si el tipo viene en metadata.type o directamente en el campo product.type
            const itemType = item.metadata?.propertyTypes || item.propertyTypes;
            return itemType?.toLowerCase() === selectedType.toLowerCase();
        });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Encabezado */}
            <header className="mb-10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                    Portafolio Exclusivo
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Catálogo de Propiedades
                </h1>
                <p className="text-gray-600 text-base max-w-2xl">
                    Explora espacios diseñados con altos estándares de calidad, ubicación estratégica y máxima plusvalía.
                </p>
            </header>

            {/* Barra de Filtros por Tipo de Inmueble */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-gray-100">
                {propertyTypes.map((type) => {
                    const isActive = selectedType === type;
                    return (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            type="button"
                            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95 ${
                                isActive
                                    ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                            }`}
                        >
                            {type}
                        </button>
                    );
                })}
            </div>

            {/* Estado de Carga */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-96 rounded-3xl bg-gray-100 animate-pulse border border-gray-200" />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-100 text-red-600 font-medium">
                    {error}
                </div>
            ) : filteredProperties.length > 0 ? (
                /* Cuadrícula de propiedades reales */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                /* Estado vacío */
                <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <span className="text-4xl block mb-2">🏠</span>
                    <h3 className="text-lg font-bold text-gray-900">No hay propiedades disponibles</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Próximamente agregaremos más inmuebles en la categoría de {selectedType}.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSelectedType("Todos")}
                        className="mt-4 text-xs font-bold text-red-500 hover:underline"
                    >
                        Ver todas las propiedades
                    </button>
                </div>
            )}
        </main>
    );
}