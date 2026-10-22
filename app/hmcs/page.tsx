import React from 'react';
import { Coffee, Clock, Leaf, Plus } from 'lucide-react';
import HmcsHeroSection from "@/app/hmcs/_components/hmcsHeroSection";

export default function HmcsLandingPage() {
    return (
        // Contenedor principal - Fondo Blanco Hueso y fuente general Inter (sans)
        <div className="min-h-screen bg-[#F8F9FA] text-[#1E1E1E] font-sans selection:bg-[#2C4A3E] selection:text-white">

            {/* Hero Section */}
            <HmcsHeroSection />
            {/* Features - Propuesta de Valor */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <FeatureCard
                        icon={<Clock className="w-6 h-6 text-[#2C4A3E]" />}
                        title="Rápido y Sin Filas"
                        description="Pide de camino a la zona de descanso y recoge tu orden al instante."
                    />
                    <FeatureCard
                        icon={<Coffee className="w-6 h-6 text-[#2C4A3E]" />}
                        title="Calidad Premium"
                        description="Ingredientes locales preparados con el estándar que mereces."
                    />
                    <FeatureCard
                        icon={<Leaf className="w-6 h-6 text-[#2C4A3E]" />}
                        title="Minimalismo Rústico"
                        description="Un ambiente limpio, diseñado para desconectar del estrés escolar."
                    />
                </div>
            </section>

            {/* Sección de Menú Destacado (Implementación de UX Guidelines) */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Favoritos de la semana
                        </h2>
                        <p className="text-[#1E1E1E]/60">Lo más pedido por los estudiantes.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Product Card 1 */}
                    <ProductCard
                        title="Café Frío Agave"
                        description="Cold brew con un toque de miel de agave y leche de avena."
                        price="$45.00"
                        imageColor="bg-[#D9C5B2]/50"
                    />
                    {/* Product Card 2 */}
                    <ProductCard
                        title="Chapata Rústica"
                        description="Pan artesanal, pechuga de pavo, queso manchego y aderezo de la casa."
                        price="$65.00"
                        imageColor="bg-[#2C4A3E]/20"
                    />
                    {/* Product Card 3 */}
                    <ProductCard
                        title="Té Matcha Helado"
                        description="Matcha orgánico preparado al momento, ideal para la concentración."
                        price="$55.00"
                        imageColor="bg-[#D9C5B2]/50"
                    />
                </div>
            </section>

            {/* Footer Minimalista */}
            <footer className="bg-[#2C4A3E] text-[#F8F9FA] py-10 text-center">
                <p className="opacity-70 text-sm">
                    © {new Date().getFullYear()} Las Hamacas. Operando en el sistema SaaS.
                </p>
            </footer>
        </div>
    );
}

// Sub-componente: Feature Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-start p-6 rounded-2xl bg-[#F8F9FA] border border-gray-100 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#D9C5B2]/30 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#1E1E1E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {title}
            </h3>
            <p className="text-[#1E1E1E]/70 leading-relaxed">
                {description}
            </p>
        </div>
    );
}

// Sub-componente: Product Card (Basado en UX Guidelines)
function ProductCard({ title, description, price, imageColor }: { title: string, description: string, price: string, imageColor: string }) {
    return (
        <div className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">
            {/* Placeholder de la imagen del producto */}
            <div className={`w-full h-48 rounded-xl ${imageColor} mb-4 flex items-center justify-center relative overflow-hidden`}>
                <span className="text-[#1E1E1E]/30 text-sm font-medium">Imagen del producto</span>
            </div>

            <div className="flex-grow">
                <h4 className="text-lg font-semibold text-[#1E1E1E] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {title}
                </h4>
                <p className="text-sm text-[#1E1E1E]/60 line-clamp-2 mb-4 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-lg font-bold text-[#2C4A3E]">{price}</span>
                <button className="w-10 h-10 rounded-full bg-[#F8F9FA] group-hover:bg-[#2C4A3E] group-hover:text-white flex items-center justify-center text-[#2C4A3E] transition-colors duration-300">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}