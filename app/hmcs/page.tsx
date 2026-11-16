import React from 'react';
import { Coffee, Clock, Leaf, Plus } from 'lucide-react';
import HmcsHeroSection from "@/app/hmcs/_components/hmcsHeroSection";
import {isRestaurantOpen} from "@/app/hmcs/_lib/schedule";
import HowHmcsItWorks from "@/app/hmcs/_components/HowItWorks";
import FeaturedProducts from "@/app/hmcs/_components/FeaturedProducts";
import {getCatalog} from "@/app/hmcs/_lib/catalog";

export const revalidate = 60; // recalcula como máximo cada minuto

export default async function HmcsLandingPage() {
    const isOpen = isRestaurantOpen();
    const { products } = await getCatalog();

    return (
        // Contenedor principal - Fondo Blanco Hueso y fuente general Inter (sans)
        <div className="min-h-screen bg-[#F8F9FA] text-[#1E1E1E] font-sans selection:bg-[#2C4A3E] selection:text-white">

            {/* Hero Section */}
            <HmcsHeroSection isOpen={isOpen} location="Campus" />
            {/* Features - Propuesta de Valor */}
            <HowHmcsItWorks/>
            <FeaturedProducts products={products} />
        </div>
    );
}
