import Link from "next/link";
import Image from "next/image";
import {uswasc, whatssapWasc} from "@/app/wasc/data/url";

export default function AboutPage() {
    return (
        <div className="space-y-16 md:space-y-24 pb-16">
            {/* 1. HERO SECTION INSTITUCIONAL */}
            <section className="relative text-white py-24 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950">
                {/* 1. Imagen de Fondo Principal */}
                <Image
                    src={`${uswasc}`} // Puedes cambiarla por tu URL o asset local
                    alt="Fondo institucional WASC"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />

                {/* 2. Capa de Degradado Overlay (Garantiza contraste y legibilidad) */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/70 to-gray-950/90 pointer-events-none" />

                {/* 3. Patrón de Puntos Radiales en Tono Rojo 500 (Optimizado y Nítido) */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ef4444_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

                {/* 4. Contenido Principal */}
                <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
                <span className="inline-block bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    Nuestra Historia y Visión
                </span>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
                        Redefiniendo el futuro de la <span className="text-red-500 drop-shadow-sm">gestión inmobiliaria</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
                        Combinamos infraestructura digital de alto rendimiento con asesoría inmobiliaria de primer nivel para conectar a personas e inversionistas con espacios excepcionales.
                    </p>
                </div>
            </section>

            {/* 2. MISIÓN Y VISIÓN */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-red-500" />
                        <span className="text-3xl">🎯</span>
                        <h2 className="text-2xl font-bold text-gray-900">Nuestra Misión</h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            Simplificar y agilizar la compra, venta y renta de inmuebles mediante plataformas tecnológicas transparentes, eficientes y seguras. Nos enfocamos en brindar una experiencia fluida tanto para el comprador como para el desarrollador.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-gray-900" />
                        <span className="text-3xl">🚀</span>
                        <h2 className="text-2xl font-bold text-gray-900">Nuestra Visión</h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            Consolidarnos como el estándar en infraestructura inmobiliaria digital en la región, ofreciendo catálogos dinámicos, métricas precisas y atención personalizada en tiempo real que impulsen la plusvalía de cada proyecto.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. NUESTROS PILARES DE VALOR */}
            <section className="bg-gray-50 py-16 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-red-500">¿Por qué elegirnos?</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nuestros Pilares Fundamentales</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-bold text-xl">
                                💻
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Tecnología de Punta</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Desarrollamos catálogos optimizados con arquitecturas modernas para que las propiedades carguen en milisegundos desde cualquier dispositivo.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-bold text-xl">
                                🛡️
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Transparencia Legal</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Verificamos la certidumbre jurídica de cada inmueble antes de publicarlo, garantizando transacciones 100% seguras y confiables.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-bold text-xl">
                                🤝
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Atención Personalizada</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Conectamos directamente a los clientes con asesores especializados vía WhatsApp para resolver dudas y agendar visitas sin intermediarios molestos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. BANNER DE LLAMADO A LA ACCIÓN (CTA ROJO) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-red-500 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl shadow-red-500/20">
                    <div className="space-y-2 max-w-xl">
                        <h2 className="text-2xl sm:text-3xl font-extrabold">¿Listo para encontrar tu próximo inmueble?</h2>
                        <p className="text-red-100 text-sm sm:text-base">Explora nuestro catálogo en vivo o ponte en contacto con nuestro equipo de asesores.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                        <Link
                            href="/wasc/properties"
                            className="bg-gray-900 hover:bg-gray-800 text-white text-center font-bold px-8 py-4 rounded-2xl transition-all shadow-md"
                        >
                            Ver Catálogo
                        </Link>
                        <a
                            href={`https://wa.me/${whatssapWasc}?text=Hola,%20me%20gustaría%20recibir%20asesoría%20sobre%20sus%20propiedades.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-red-600 hover:bg-red-50 text-center font-bold px-8 py-4 rounded-2xl transition-all shadow-md"
                        >
                            Contactar Asesor
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}