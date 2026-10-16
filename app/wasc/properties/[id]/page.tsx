import Link from "next/link";
import { notFound } from "next/navigation";
import { propertiesData } from "@/app/wasc/data/properties";
import PropertyGallery from "@/app/wasc/components/PropertyGallery";

interface PropertyDetailProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailProps) {
    const { id } = await params;
    const property = propertiesData.find((p) => p.id === id);

    if (!property) {
        notFound();
    }

    const whatsappMessage = encodeURIComponent(
        `¡Hola! Me interesa obtener información de la propiedad: "${property.title}" (Ref ID: ${property.id}).`
    );
    const whatsappUrl = `https://wa.me/521234567890?text=${whatsappMessage}`;

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <Link
                href="/wasc/properties"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-500 transition-colors mb-6 group"
            >
                <span className="transition-transform group-hover:-translate-x-1">←</span> Volver al catálogo
            </Link>

            <article className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden p-6 md:p-8 space-y-8">

                {/* Galería Interactiva con Modal */}
                <PropertyGallery
                    images={property.images && property.images.length > 0 ? property.images : [property.image]}
                    title={property.title}
                />

                {/* Encabezado y Precio */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                            {property.location}
                        </span>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-1 tracking-tight">
                            {property.title}
                        </h1>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight shrink-0">
                        {property.price}
                    </div>
                </div>

                {/* Métricas Técnicas */}
                <div className="grid grid-cols-3 gap-4 py-6 bg-gray-50/80 rounded-2xl px-4 border border-gray-100/80">
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Recámaras</span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>🛏️</span> {property.bedrooms}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-x border-gray-200">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Baños</span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>🛁</span> {property.bathrooms}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Superficie</span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>📐</span> {property.sqm} <span className="text-sm text-gray-500 font-normal">m²</span>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción de la propiedad</h2>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {property.description}
                    </p>
                </section>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-emerald-600/20 active:scale-[0.99]"
                    >
                        <span>💬</span> Agendar Visita por WhatsApp
                    </a>
                    <button
                        type="button"
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-red-500/20 active:scale-[0.99]"
                    >
                        Contactar Asesor
                    </button>
                </div>
            </article>
        </main>
    );
}