import Image from "next/image";
import Link from "next/link";

export default function WascHeroSection() {
    return (
        <section className="relative text-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950">
            {/* 1. Imagen de Fondo Principal */}
            <Image
                src="https://cdn.pixabay.com/photo/2019/05/03/08/24/san-carlos-4175388_1280.jpg" // Puedes sustituir esta URL por tu imagen de Cloudinary o asset local
                alt="Fondo de bienes raíces de lujo"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* 2. Capa de Degradado Overlay (Garantiza contraste de lectura y aplica los tonos Rojos) */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            {/* 3. Patrón de Puntos Radiales en Tono Rojo (Alineado a la marca) */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* 4. Contenido Principal */}
            <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
                <span className="inline-block bg-red-500/50 text-gray-300 border border-red-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
                    Infraestructura Digital Inmobiliaria
                </span>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                    Encuentra el espacio perfecto para tu <span className="text-red-600 drop-shadow-sm">próximo capítulo</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-sm">
                    Explora nuestro catálogo exclusivo de residencias, departamentos y desarrollos de alta plusvalía con navegación fluida y atención personalizada.
                </p>

                {/* Barra de Búsqueda / Llamado a la Acción */}
                <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 shadow-2xl">
                    <div className="flex-1 bg-white rounded-xl px-4 py-3 text-left">
                        <span className="block text-xs font-bold text-gray-400 uppercase">Ubicación o Tipo</span>
                        <span className="text-gray-800 font-medium text-sm">Terrenos,Zona San carlos.</span>
                    </div>
                    <Link
                        href="/wasc/properties"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <span>🔍</span> Ver Catálogo
                    </Link>
                </div>
            </div>
        </section>
    );
}