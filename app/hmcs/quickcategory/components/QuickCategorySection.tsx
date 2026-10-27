"use client";

import React from 'react';
import { ArrowRight, Utensils, Coffee, Sandwich } from 'lucide-react';

interface CategoryOption {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    badge?: string;
    bgGradient: string;
}

const CATEGORIES: CategoryOption[] = [
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

interface QuickCategorySelectionProps {
    onSelectCategory?: (categoryId: string) => void;
}

export default function QuickCategorySelection({ onSelectCategory }: QuickCategorySelectionProps) {
    const handleSelect = (id: string) => {
        if (onSelectCategory) {
            onSelectCategory(id);
        } else {
            console.log(`Categoría seleccionada: ${id}`);
        }
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8">
            {/* Encabezado Conciso */}
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

            {/* Grid de Tarjetas de Categoría Grande (Mobile-First) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleSelect(category.id)}
                        className={`group relative text-left bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#2C4A3E] transition-all duration-300 flex flex-col justify-between overflow-hidden active:scale-[0.98] ${category.bgGradient}`}
                    >
                        {/* Top Bar de la Tarjeta */}
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

                            {/* Título y Descripción */}
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

                        {/* CTA Inferior */}
                        <div className="flex items-center gap-2 text-sm font-bold text-[#2C4A3E] pt-2 border-t border-gray-100/60 w-full">
                            <span>Elegir categoría</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}