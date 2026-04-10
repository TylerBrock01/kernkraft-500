'use client';

import React, {use} from 'react';
import { motion } from 'framer-motion';
import {useCatalog} from "@/app/hooks/useCatalog";
import MadeByAyax from "@/components/themes/Made-by-ayax";
import DemoPage from "@/components/themes/HotDogsDemo";
import BurritoThemeMockup from "@/components/themes/Burritos";
import BurgerPicnicTheme from "@/components/themes/burger";
import TortasFightTheme from "@/components/themes/Tortas";

export default function StorefrontPage({ params }: { params: Promise<{ tenant: string }> }) {    // 🔌 Conectamos el Cerebro (Hook) al Cuerpo (UI)
    const resolvedParams = use(params);
    if (resolvedParams.tenant === 'made-by-ayax') {
        return <MadeByAyax/>
    }
    if (resolvedParams.tenant === 'hot-dogs') {
        return <DemoPage/>
    }
    if (resolvedParams.tenant === 'burros') {
        return <BurritoThemeMockup/>
    }
    if (resolvedParams.tenant === 'burger') {
        return <BurgerPicnicTheme/>
    }
    if (resolvedParams.tenant === 'tortas-fight') {
        return <TortasFightTheme/>
    }
    const {
        store,
        products,
        meta,
        isLoading,
        error,
        page,
        setPage,
        searchInput,
        setSearchInput
    } = useCatalog(resolvedParams.tenant);
    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden selection:bg-red-500/30">

                {/* 🚨 Efecto de Alerta / Radar Perdido */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 text-center max-w-md w-full"
                >
                    {/* Icono Técnico Animado */}
                    <div className="w-24 h-24 mx-auto border border-zinc-800 bg-zinc-900/50 rounded-full flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 rounded-full border border-red-500/30 border-t-red-500 animate-[spin_4s_linear_infinite]"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-zinc-100 uppercase tracking-tighter mb-4">
                        Señal Perdida
                    </h1>

                    {/* La caja que muestra el mensaje real del backend */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8 backdrop-blur-sm">
                        <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                            {error} {/* 👈 Aquí es donde dice: "La tienda 'test' no existe..." */}
                        </p>
                    </div>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-3 bg-zinc-100 text-zinc-950 hover:bg-white rounded-lg font-black uppercase tracking-widest text-[10px] transition-all"
                    >
                        Retroceder
                    </button>
                </motion.div>

                {/* Marca de agua de la Agencia */}
                <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
                    <p className="text-zinc-700 text-[9px] uppercase tracking-[0.4em] font-bold">
                        Infraestructura Protegida por CAZA
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 font-sans">

            {/* 🏬 HEADER DE LA TIENDA */}
            <header className="pt-20 pb-12 px-6 border-b border-zinc-900 text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
                    {isLoading && !store ? 'Cargando...' : store?.name}
                </h1>
                <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
                    Powered by CAZA Engine
                </p>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* 🔍 BARRA DE BÚSQUEDA TÁCTICA */}
                <div className="mb-12 max-w-xl mx-auto relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-zinc-600">⌕</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar en el inventario..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-xl pl-10 pr-4 py-4 outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all backdrop-blur-md"
                    />
                    {isLoading && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <div className="w-4 h-4 border-2 border-zinc-600 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {/* 🍱 GRID DE PRODUCTOS */}
                {products.length === 0 && !isLoading ? (
                    <div className="text-center py-20 text-zinc-500">
                        {meta.hasSearch
                            ? `No encontramos "${searchInput}" en el radar.`
                            : 'El inventario está vacío.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-full h-40 bg-zinc-900 rounded-xl mb-4 border border-zinc-800 flex items-center justify-center text-zinc-700">
                                        {/* Aquí iría tu etiqueta <img /> o <Image /> */}
                                        <span>{product.name.charAt(0)}</span>
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight mb-2 truncate">{product.name}</h3>
                                    <p className="text-zinc-500 text-xs line-clamp-2">{product.description}</p>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="font-mono font-black text-xl">${Number(product.price).toFixed(2)}</span>
                                    <button className="bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-colors">
                                        Agregar
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* 📑 CONTROLES DE PAGINACIÓN */}
                {meta.lastPage > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-4">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-full disabled:opacity-30 hover:bg-zinc-800 transition-colors"
                        >
                            ←
                        </button>
                        <span className="font-mono text-zinc-500 text-sm">
              {page} / {meta.lastPage}
            </span>
                        <button
                            disabled={page === meta.lastPage}
                            onClick={() => setPage(p => p + 1)}
                            className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-full disabled:opacity-30 hover:bg-zinc-800 transition-colors"
                        >
                            →
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}