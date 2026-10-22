import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/app/lib/axios/axios";
import PropertyGallery from "@/app/wasc/components/PropertyGallery";
import { whatssapWasc } from "@/app/wasc/data/url";

// Slug fijo o dinámico para el tenant
const BUSINESS_SLUG = "wasc";

interface PropertyDetailProps {
    params: Promise<{
        id: string;
    }>;
}

// 🌐 Función auxiliar adaptada a la nueva ruta del CatalogController
async function getProduct(id: string) {
    try {
        const response = await api.get(`/catalog/${BUSINESS_SLUG}/${id}`);
        // Extraemos la propiedad del objeto devuelto por el backend { store, product }
        return response.data.product;
    } catch (error) {
        return null;
    }
}

export default async function PropertyDetailPage({ params }: PropertyDetailProps) {
    const { id } = await params;
    const property = await getProduct(id);

    // Si no existe o devolvió un 404 desde el backend
    if (!property) {
        notFound();
    }

    // 🧠 Metadatos dinámicos (JSONB)
    const meta = property.metadata || {};

    // 📸 Preparamos las imágenes para la galería
    const galleryImages = property.images && property.images.length > 0
        ? property.images
        : (property.image ? [property.image] : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800']);

    // 💰 Formatear precio
    const formattedPrice = typeof property.price === 'number'
        ? `$${property.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
        : property.price;

    const whatsappMessage = encodeURIComponent(
            `¡Hola! 👋
    
    Me interesa obtener más información sobre esta propiedad:
    
    🏠 *${property.name}*
    📍 ${meta.location || 'Ubicación exclusiva'}
    💰 ${formattedPrice}
    
    🔑 Tipo: ${meta.propertyType || property.type}
    
    🔗 Ver detalles: https://cazastore.vercel.app/wasc/properties/${property.id}
    
    ¿Podemos agendar una visita?`
    );
    const whatsappUrl = `https://wa.me/52${whatssapWasc}?text=${whatsappMessage}`;

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
                    images={galleryImages}
                    title={property.name}
                />

                {/* Encabezado, Tipo y Precio */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            {meta.propertyType && (
                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {meta.propertyType}
                                </span>
                            )}
                            {meta.location && (
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    {meta.location}
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            {property.name}
                        </h1>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight shrink-0">
                        {formattedPrice}
                    </div>
                </div>

                {/* Métricas Técnicas (Leyendo desde metadata dinámico) */}
                <div className="grid grid-cols-3 gap-4 py-6 bg-gray-50/80 rounded-2xl px-4 border border-gray-100/80">
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Recámaras</span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>🛏️</span> {meta.bedrooms ?? '-'}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-x border-gray-200">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Baños</span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>🛁</span> {meta.bathrooms ?? '-'}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Superficie</span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>📐</span> {meta.sqm ?? '-'} <span className="text-sm text-gray-500 font-normal">m²</span>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción de la propiedad</h2>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {property.description || 'Sin descripción detallada.'}
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