'use client';

import React, { useState, useEffect, useCallback } from 'react';
import InventoryTable, { Product } from '@/components/inventory/InventoryTable';
import ProductDrawer from '@/components/inventory/ProductDrawer';
import {api} from "@/app/lib/axios/axios";
import SearchInput from "@/components/inventory/SearchInput";
import {useRouter} from "next/navigation";

export default function InventoryPage() {
    // Estados Globales de la Vista
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Estados de Paginación
    const [skip, setSkip] = useState(0);
    const take = 10;
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // 🔍 Estado del buscador
    const router = useRouter()
    // Función Central de Red
    const fetchProducts = useCallback(async (currentSkip = skip,search = searchTerm) => {
        setIsLoading(true);
        try {
            const response = await api.get('/products', { params: { take, skip: currentSkip,search } });
            setProducts(response.data.products);
            setHasMore(currentSkip + take < response.data.total);
        } catch (error) {
            console.error('Error obteniendo inventario:', error);
        } finally {
            setIsLoading(false);
        }
    }, [skip, take, searchTerm]);
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setSkip(0);
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="w-full h-full flex flex-col">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Inventario Global</h1>
                    <p className="text-zinc-500 text-sm mt-1">Gestión de mercancía y existencias</p>
                </div>
                <SearchInput onSearch={handleSearch} /> {/* 🔍 EL RADAR AQUÍ */}
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2"
                >
                    <span>+</span> Recepción de Carga
                </button>
            </div>

            {/* COMPONENTES HIJOS */}
            <div className="flex-1 min-h-0">
                <InventoryTable
                    products={products}
                    isLoading={isLoading}
                    skip={skip}
                    take={take}
                    hasMore={hasMore}
                    onNextPage={() => setSkip(skip + take)}
                    onPrevPage={() => setSkip(Math.max(0, skip - take))}
                    onRowClick={(id) => router.push(`/dashboard/inventory/${id}`)}
                />
            </div>

            <ProductDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSuccess={() => fetchProducts(0)} // Reseteamos a la página 1 al crear un producto
            />
        </div>
    );
}