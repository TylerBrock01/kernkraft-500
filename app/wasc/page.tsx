import Link from "next/link";
import Image from "next/image";
import { propertiesData } from "@/app/wasc/data/properties";

export default function WascLandingPage() {
    // Tomamos las primeras 3 propiedades para la sección de destacados
    const featuredProperties = propertiesData.slice(0, 3);

    return (
        <div className="space-y-16 md:space-y-24 pb-16">
            {/* 1. HERO SECTION: Impacto Visual y Buscador Principal */}
            <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative max-w-5xl mx-auto text-center space-y-8">
                    <span className="inline-block bg-blue-600/30 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
                        Infraestructura Digital Inmobiliaria
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                        Encuentra el espacio perfecto para tu <span className="text-blue-500">próximo capítulo</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
                        Explora nuestro catálogo exclusivo de residencias, departamentos y desarrollos de alta plusvalía con navegación fluida y atención personalizada.
                    </p>

                    {/* Barra de Búsqueda / Llamado a la Acción */}
                    <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 bg-white rounded-xl px-4 py-3 text-left">
                            <span className="block text-xs font-bold text-gray-400 uppercase">Ubicación o Tipo</span>
                            <span className="text-gray-800 font-medium text-sm">Residenciales, Zona Norte...</span>
                        </div>
                        <Link
                            href="/wasc/properties"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                        >
                            <span>🔍</span> Ver Catálogo
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. PROPIEDADES DESTACADAS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Oportunidades Únicas</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Propiedades Destacadas</h2>
                    </div>
                    <Link
                        href="/wasc/properties"
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                    >
                        Explorar todo el catálogo <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map((property) => (
                        <div key={property.id} className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        {property.location}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {property.title}
                                </h3>
                                <p className="text-2xl font-black text-gray-900 mb-4">{property.price}</p>

                                <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 text-xs text-gray-500 mb-6 font-medium">
                                    <span>🛏️ {property.bedrooms} Rec.</span>
                                    <span>🛁 {property.bathrooms} Baños</span>
                                    <span>📐 {property.sqm} m²</span>
                                </div>

                                <Link
                                    href={`/wasc/catalog/${property.id}`}
                                    className="mt-auto block w-full text-center bg-gray-900 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm"
                                >
                                    Ver Detalle
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. MÓDULO DE VALOR / CONFIANZA */}
            <section className="bg-gray-50 py-16 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 space-y-3">
                            <div className="text-4xl">⚡</div>
                            <h3 className="text-lg font-bold text-gray-900">Navegación Ultrarrápida</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Sin esperas ni tiempos de carga pesados. Encuentra los detalles técnicos e imágenes de forma instantánea.</p>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="text-4xl">🛡️</div>
                            <h3 className="text-lg font-bold text-gray-900">Asesoría Jurídica Segura</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Todas las propiedades listadas cuentan con expediente legal verificado y listo para escrituración.</p>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="text-4xl">📲</div>
                            <h3 className="text-lg font-bold text-gray-900">Atención Inmediata</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Conéctate directo con el asesor responsable a través de WhatsApp con un solo clic.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. BANNER FINAL / CALL TO ACTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-600/20">
                    <div className="space-y-2 max-w-xl">
                        <h2 className="text-2xl sm:text-3xl font-extrabold">¿Quieres promover tu propiedad con nosotros?</h2>
                        <p className="text-blue-100 text-sm sm:text-base">Integramos tu inmueble a nuestro catálogo digital para conectar con compradores calificados.</p>
                    </div>
                    <a
                        href="https://wa.me/521234567890?text=Hola,%20me%20gustaría%20publicar%20mi%20propiedad%20en%20su%20catálogo."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-blue-600 font-extrabold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shrink-0 shadow-md"
                    >
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
}