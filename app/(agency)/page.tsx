import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CazaLandingPage() {
    const HERO_IMAGE_URL = "https://res.cloudinary.com/tyler-brock/image/upload/v1775171091/CazaHeroImage_gi6wai.jpg";

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[92vh] overflow-hidden">

            {/* 🏙️ IMAGEN DESDE CLOUDINARY */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src={HERO_IMAGE_URL}
                    alt="Atmósfera inmersiva CAZA"
                    fill
                    quality={100}
                    className="object-cover object-center scale-105"
                    priority
                />

                {/* ✨ VELO Y VIÑETA (Mantiene la vibra melancólica) */}
                <div className="absolute inset-0 bg-[#0a0a0a]/50 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0a0a0a_85%)]" />
            </div>

            {/* Contenido Central */}
            <div className="z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl">
                <h1 className="text-6xl md:text-8xl font-semibold text-white tracking-tight mb-8">
                    El motor de tu comercio. <br className="hidden md:block" />
                    <span className="text-zinc-500">Silencioso. Implacable.</span>
                </h1>

                <p className="text-lg md:text-2xl text-zinc-300 mb-12 max-w-3xl font-light leading-relaxed">
                    Infraestructura de punto de venta, inventario y finanzas para negocios que exigen el control absoluto de su operación.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                    <Link
                        href="/demo-tenant/admin/login"
                        className="flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-md font-medium hover:bg-zinc-200 transition-colors shadow-2xl shadow-white/5 text-lg"
                    >
                        Iniciar Sistema
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/pricing"
                        className="flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-zinc-300 px-10 py-4 rounded-md font-medium hover:bg-zinc-900 transition-colors text-lg"
                    >
                        Ver Planes
                    </Link>
                </div>
            </div>
        </div>
    );
}