import Link from "next/link";
import Image from "next/image";
// import { propertiesData } from "@/app/wasc/data/properties";
import {whatssapWasc} from "@/app/wasc/data/url";
import WascHeroSection from "@/app/wasc/_components/wascHeroSection";

export default function WascLandingPage() {

    // const featuredProperties = propertiesData.slice(0, 3);

    return (
        <div className="space-y-16 md:space-y-24 pb-16">
            {/* 1. HERO SECTION: Impacto Visual y Buscador Principal */}
            <WascHeroSection/>
            {/* 2. PROPIEDADES DESTACADAS */}
            {/*<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">*/}
            {/*        <div>*/}
            {/*            <span className="text-xs font-bold uppercase tracking-widest text-red-600">Oportunidades Únicas</span>*/}
            {/*            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Propiedades Destacadas</h2>*/}
            {/*        </div>*/}
            {/*        <Link*/}
            {/*            href="/wasc/properties"*/}
            {/*            className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"*/}
            {/*        >*/}
            {/*            Explorar todo el catálogo <span className="transition-transform group-hover:translate-x-1">→</span>*/}
            {/*        </Link>*/}
            {/*    </div>*/}

            {/*    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">*/}
            {/*        {featuredProperties.map((property) => (*/}
            {/*            <PropertyCard key={property.id} property={property} />*/}

            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* 3. MÓDULO DE VALOR / CONFIANZA */}
            <section className="bg-gray-300/50 py-16 border-y border-gray-100">
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
                <div className="bg-red-600 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl shadow-red-600/20">
                    <div className="space-y-2 max-w-xl">
                        <h2 className="text-2xl sm:text-3xl font-extrabold">¿Quieres promover tu propiedad con nosotros?</h2>
                        <p className="text-red-100 text-sm sm:text-base">Integramos tu inmueble a nuestro catálogo digital para conectar con compradores calificados.</p>
                    </div>
                    <a
                        href={`https://wa.me/${whatssapWasc}?text=Hola,%20me%20gustaría%20publicar%20mi%20propiedad%20en%20su%20catálogo.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-red-600 font-extrabold px-8 py-4 rounded-2xl hover:bg-red-50 transition-all shrink-0 shadow-md"
                    >
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
}