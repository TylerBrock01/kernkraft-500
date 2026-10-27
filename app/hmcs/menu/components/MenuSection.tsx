'use client'

import React, { useState } from 'react';
import { Search, Plus, Check, ShoppingBag } from 'lucide-react';

// Datos de ejemplo para el demo
const CATEGORIES = [
    { id: 'all', name: 'Todo' },
    { id: 'tacos', name: 'Tacos 🌮' },
    { id: 'tortas', name: 'Sándwiches & Tortas 🥪' },
    { id: 'bebidas', name: 'Bebidas ☕' },
];

const PRODUCTS = [
    { id: 1, category: 'tacos', name: 'Tacos de Guisado (Ord. 3)', description: 'Tortilla artesanal, guisado del día y salsa tatemada.', price: '$45.00', imageBg: 'bg-[#D9C5B2]/40' },
    { id: 2, category: 'tacos', name: 'Taco Campechano Especial', description: 'Suadero y longaniza con toque de cilantro fresco.', price: '$22.00', imageBg: 'bg-[#2C4A3E]/20' },
    { id: 3, category: 'tortas', name: 'Chapata Rústica de Pavo', description: 'Pan artesanal, pechuga de pavo, queso manchego y aderezo.', price: '$65.00', imageBg: 'bg-[#D9C5B2]/50' },
    { id: 4, category: 'tortas', name: 'Torta de Milanesa Crujiente', description: 'Frijoles refritos, aguacate, queso fresco y chipotle.', price: '$55.00', imageBg: 'bg-[#2C4A3E]/15' },
    { id: 5, category: 'bebidas', name: 'Café Frío Agave (Cold Brew)', description: 'Extracción en frío, toque de miel de agave y leche de avena.', price: '$45.00', imageBg: 'bg-[#D9C5B2]/60' },
    { id: 6, category: 'bebidas', name: 'Matcha Helado Orgánico', description: 'Preparado al momento, notas terrosas y ligeras de vainilla.', price: '$55.00', imageBg: 'bg-[#2C4A3E]/25' },
];

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);

    // Filtrar productos según categoría y búsqueda
    const filteredProducts = PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1E1E1E] p-4 sm:p-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Cabecera del Panel de Orden */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#1E1E1E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Haz tu pedido rápido
                        </h2>
                        <p className="text-[#1E1E1E]/60 text-sm">Selecciona tu categoría, pide y pasa a recoger.</p>
                    </div>

                    {/* Indicador de Carrito Flotante Mock */}
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                        <ShoppingBag className="w-5 h-5 text-[#2C4A3E]" />
                        <span className="font-semibold text-sm">{cartCount} productos</span>
                    </div>
                </div>

                {/* Barra de Búsqueda Rápida */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E1E1E]/40" />
                    <input
                        type="text"
                        placeholder="Busca un taco, torta o bebida..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#2C4A3E] transition-colors shadow-sm"
                    />
                </div>

                {/* Pestañas de Categorías (Diseño Horizontal Desplazable en Móvil) */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                                activeCategory === cat.id
                                    ? 'bg-[#2C4A3E] text-white shadow-md shadow-[#2C4A3E]/20'
                                    : 'bg-white text-[#1E1E1E]/70 border border-gray-200 hover:border-[#2C4A3E]/50'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid de Productos Dinámicos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`w-full h-36 rounded-xl ${product.imageBg} mb-4 flex items-center justify-center`}>
                    <span className="text-xs font-semibold text-[#1E1E1E]/40 uppercase tracking-wider">
                      {product.category}
                    </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 text-[#1E1E1E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-[#1E1E1E]/60 mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                    <span className="font-bold text-[#2C4A3E] text-base">{product.price}</span>
                                    <button
                                        onClick={() => setCartCount(prev => prev + 1)}
                                        className="w-9 h-9 rounded-full bg-[#F8F9FA] group-hover:bg-[#2C4A3E] group-hover:text-white flex items-center justify-center text-[#2C4A3E] transition-colors duration-200 active:scale-95"
                                        aria-label={`Agregar ${product.name}`}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-[#1E1E1E]/50">
                            No encontramos productos en esta búsqueda o categoría.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}