import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {propertiesData} from "@/app/wasc/data/properties";

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

    // Mensaje preconfigurado para WhatsApp
    const whatsappMessage = encodeURIComponent(
        `¡Hola! Me interesa obtener más información sobre la propiedad: "${property.title}" (Ref ID: ${property.id}).`
    );
    const whatsappUrl = `https://wa.me/521234567890?text=${whatsappMessage}`;

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            {/* Navegación de retorno */}
            <Link
                href="/wasc/properties"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors mb-6 group"
            >
                <span className="transition-transform group-hover:-translate-x-1">←</span> Volver al catálogo
            </Link>

            <article className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                {/* Hero / Galería Principal */}
                <div className="h-[28rem] w-full relative bg-gray-100">
                    <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                            Destacado
                        </span>
                        <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                            En Venta
                        </span>
                    </div>
                </div>

                {/* Detalles del Inmueble */}
                <div className="p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
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

                    {/* Ficha técnica de métricas */}
                    <div className="grid grid-cols-3 gap-4 py-6 bg-gray-50/80 rounded-2xl my-8 px-4 border border-gray-100/80">
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
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción de la propiedad</h2>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            {property.description}
                        </p>
                    </section>

                    {/* Acciones de Contacto */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-emerald-600/20 hover:shadow-lg active:scale-[0.99]"
                        >
                            <span>💬</span> Agendar Visita por WhatsApp
                        </a>
                        <button
                            type="button"
                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-gray-900/10 hover:shadow-lg active:scale-[0.99]"
                        >
                            Contactar Asesor
                        </button>
                    </div>
                </div>
            </article>
        </main>
    );
}