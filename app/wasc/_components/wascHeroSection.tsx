import Image from "next/image";
import Link from "next/link";
import {hero} from "@/app/wasc/data/url";

export default function WascHeroSection() {
    return (
        <section className="relative text-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950">
            {/* 1. Imagen de Fondo Principal (San Carlos) */}
            <Image
                src={hero}
                alt="Fondo de bienes raíces en San Carlos"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* 2. Capa de Degradado Overlay General */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-black/60 to-gray-950/90 pointer-events-none" />

            {/* 3. Patrón de Puntos Radiales en Tono Rojo 500 (Optimizado y Nítido) */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ef4444_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            {/* 4. Viñeta sutil opcional (elimina la distorsión del backdrop-blur y da profundidad) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* 4. Contenido Principal */}
            <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
                {/* Badge Institucional */}
                <span className="inline-block bg-red-500/20 text-red-400 border border-red-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    Infraestructura Digital Inmobiliaria
                </span>

                {/* Título Principal */}
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
                    Encuentra el espacio perfecto para tu <span className="text-red-500 drop-shadow-sm">próximo capítulo</span>
                </h1>

                {/* Subtítulo */}
                <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-sm">
                    Explora nuestro catálogo exclusivo de residencias, departamentos y desarrollos de alta plusvalía con navegación fluida y atención personalizada.
                </p>

                {/* Barra de Búsqueda / Llamado a la Acción */}
                <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 shadow-2xl">
                    <div className="flex-1 bg-white rounded-xl px-4 py-3 text-left shadow-inner">
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Ubicación</span>
                        <span className="text-gray-800 font-medium text-sm">Zona San Carlos</span>
                    </div>
                    <Link
                        href="/wasc/properties"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 active:scale-95 shrink-0"
                    >
                        <span>🔍</span> Ver Catálogo
                    </Link>
                </div>
            </div>
        </section>
    );
}