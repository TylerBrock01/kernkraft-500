"use client";

import React, { useState } from 'react';
import { ArrowRight, Utensils, Coffee, Sandwich, ArrowLeft, Plus, Check } from 'lucide-react';
import {useCart} from "@/app/hmcs/_context/CartContext";

// 1. Definición de Categorías
const CATEGORIES = [
    {
        id: 'tacos',
        title: 'Tacos de Guisado',
        subtitle: 'Guisados del día, tortillas a mano y salsas tatemadas.',
        icon: <Utensils className="w-7 h-7 text-[#2C4A3E]" />,
        badge: 'Popular entre clases',
        bgGradient: 'bg-gradient-to-br from-[#D9C5B2]/20 to-transparent',
    },
    {
        id: 'tortas',
        title: 'Sándwiches & Tortas',
        subtitle: 'Chapatas artesanales, milanesa, pavo y más.',
        icon: <Sandwich className="w-7 h-7 text-[#2C4A3E]" />,
        bgGradient: 'bg-gradient-to-br from-[#2C4A3E]/10 to-transparent',
    },
    {
        id: 'bebidas',
        title: 'Bebidas & Cafetería',
        subtitle: 'Cold brew, matcha orgánico, jugos y aguas del día.',
        icon: <Coffee className="w-7 h-7 text-[#2C4A3E]" />,
        badge: 'Listo en 2 min',
        bgGradient: 'bg-gradient-to-br from-[#D9C5B2]/30 to-transparent',
    },
];

// 2. Base de Datos Mock de Productos por Categoría
const PRODUCTS = [
    { id: 1, category: 'tacos', name: 'Tacos de Guisado (Ord. 3)', description: 'Tortilla artesanal, guisado del día y salsa tatemada.', price: '$45.00', imageBg: 'bg-[#D9C5B2]/40' },
    { id: 2, category: 'tacos', name: 'Taco Campechano Especial', description: 'Suadero y longaniza con toque de cilantro fresco.', price: '$22.00', imageBg: 'bg-[#2C4A3E]/20' },
    { id: 3, category: 'tacos', name: 'Tacos de Chicharrón en Salsa Verde (Ord. 3)', description: 'Chicharrón prensado, nopales y tortilla recién hecha.', price: '$48.00', imageBg: 'bg-[#D9C5B2]/30' },
    { id: 4, category: 'tortas', name: 'Chapata Rústica de Pavo', description: 'Pan artesanal, pechuga de pavo, queso manchego y aderezo.', price: '$65.00', imageBg: 'bg-[#D9C5B2]/50' },
    { id: 5, category: 'tortas', name: 'Torta de Milanesa Crujiente', description: 'Frijoles refritos, aguacate, queso fresco y chipotle.', price: '$55.00', imageBg: 'bg-[#2C4A3E]/15' },
    { id: 6, category: 'bebidas', name: 'Café Frío Agave (Cold Brew)', description: 'Extracción en frío, toque de miel de agave y leche de avena.', price: '$45.00', imageBg: 'bg-[#D9C5B2]/60' },
    { id: 7, category: 'bebidas', name: 'Matcha Helado Orgánico', description: 'Preparado al momento, notas terrosas y ligeras de vainilla.', price: '$55.00', imageBg: 'bg-[#2C4A3E]/25' },
];

export default function QuickCategorySection() {
    // Estado para saber qué categoría seleccionó el usuario (null = Paso 1: Categorías)
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const { addToCart } = useCart(); // <-- Esto debe estar aquí adentro

    const parsePrice = (priceStr: string) => {
        return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    };
    // Categoría actual seleccionada
    const activeCategory = CATEGORIES.find(cat => cat.id === selectedCategoryId);

    // Filtrar productos pertenecientes a la categoría activa
    const filteredProducts = PRODUCTS.filter(prod => prod.category === selectedCategoryId);

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8">

            {/* VISTA 1: SELECCIÓN DE CATEGORÍA (Si selectedCategoryId es null) */}
            {!selectedCategoryId ? (
                <div className="animate-fadeIn">
                    {/* Encabezado */}
                    <div className="mb-8 text-center sm:text-left">
                        <h2
                            className="text-3xl font-extrabold text-[#1E1E1E] tracking-tight mb-2"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            ¿Qué se te antoja hoy?
                        </h2>
                        <p className="text-[#1E1E1E]/60 text-base">
                            Selecciona una categoría para armar tu pedido express y pasar a recoger.
                        </p>
                    </div>

                    {/* Grid de Tarjetas de Categorías */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategoryId(category.id)}
                                className={`group relative text-left bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#2C4A3E] transition-all duration-300 flex flex-col justify-between overflow-hidden active:scale-[0.98] ${category.bgGradient}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {category.icon}
                                        </div>
                                        {category.badge && (
                                            <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#2C4A3E]/10 text-[#2C4A3E]">
                        {category.badge}
                      </span>
                                        )}
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-[#1E1E1E] mb-2 group-hover:text-[#2C4A3E] transition-colors"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-[#1E1E1E]/65 leading-relaxed mb-6">
                                        {category.subtitle}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-[#2C4A3E] pt-2 border-t border-gray-100/60 w-full">
                                    <span>Elegir categoría</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (

                /* VISTA 2: MENÚ DE LA CATEGORÍA SELECCIONADA */
                <div className="animate-fadeIn">
                    {/* Barra superior con botón de regresar y selector rápido */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200/60">
                        <button
                            onClick={() => setSelectedCategoryId(null)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C4A3E] hover:text-[#1f352c] bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:border-[#2C4A3E] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Cambiar categoría</span>
                        </button>

                        {/* Pestañas de categorías pequeñas para cambiar rápido de vista */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategoryId(cat.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                        selectedCategoryId === cat.id
                                            ? 'bg-[#2C4A3E] text-white'
                                            : 'bg-white text-[#1E1E1E]/70 border border-gray-200 hover:border-[#2C4A3E]/40'
                                    }`}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Título de la categoría activa */}
                    <div className="mb-6">
                        <h2
                            className="text-3xl font-extrabold text-[#1E1E1E]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {activeCategory?.title}
                        </h2>
                        <p className="text-[#1E1E1E]/60 text-sm mt-1">
                            {activeCategory?.subtitle}
                        </p>
                    </div>

                    {/* Lista de productos filtrados */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`w-full h-36 rounded-xl ${product.imageBg} mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-xs font-semibold text-[#1E1E1E]/40 uppercase tracking-wider">
                      {product.category}
                    </span>
                                    </div>
                                    <h3
                                        className="font-bold text-lg mb-1 text-[#1E1E1E]"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-[#1E1E1E]/60 mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                    <span className="font-bold text-[#2C4A3E] text-base">{product.price}</span>
                                    <button
                                        onClick={() => {
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                numericPrice: parsePrice(product.price)
                                            });
                                        }}
                                        className="w-9 h-9 rounded-full bg-[#F8F9FA] group-hover:bg-[#2C4A3E] group-hover:text-white flex items-center justify-center text-[#2C4A3E] transition-colors duration-200 active:scale-95 cursor-pointer"
                                        aria-label={`Agregar ${product.name}`}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </section>
    );
}