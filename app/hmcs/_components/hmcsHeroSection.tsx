// /hmcs/_components/HmcsHero.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {herohcms} from "@/app/hmcs/data/url";

interface HmcsHeroProps {
    /** Si el restaurante está abierto en este momento */
    isOpen?: boolean;
    /** Ubicación mostrada en la etiqueta de estado */
    location?: string;
    /** Ruta del menú completo */
    menuHref?: string;
    /** Acción del botón principal (ej. abrir la orden) */
    onOrderClick?: () => void;
}

export default function HmcsHero({
                                     isOpen = true,
                                     location = "Campus",
                                     menuHref = "/menu",
                                     onOrderClick,
                                 }: HmcsHeroProps) {
    return (
        <section
            aria-labelledby="hero-title"
            className="relative mx-auto flex min-h-[550px] max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center md:py-24"
        >
            {/* Imagen de fondo y Capa de Superposición (Overlay) */}
            <div className="absolute inset-0 z-0">
                {/* Cambia la URL por la de tu imagen (puede ser un link de Unsplash o una ruta local ej. /images/hero-bg.jpg) */}
                <img
                    src={`${herohcms}`}
                    alt="Fondo Las Hamacas"
                    className="h-full object-cover w-full"
                />
                {/* Overlay oscuro para garantizar la lectura del texto (Tonos de Verde Agave profundo) */}
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"></div>
            </div>

            {/* Contenido del Hero (Aseguramos que esté sobre la capa z-10) */}
            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
                {/* Estado del restaurante */}
                <div
                    role="status"
                    className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm ${
                        isOpen
                            ? "bg-white/15 text-white backdrop-blur-md border border-white/20"
                            : "bg-red-500/80 text-white"
                    }`}
                >
            <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                    isOpen
                        ? "animate-pulse bg-[#D9C5B2] motion-reduce:animate-none"
                        : "bg-white"
                }`}
            />
                    {isOpen ? "Abierto ahora" : "Cerrado"} · {location}
                </div>

                {/* Título */}
                <h1
                    id="hero-title"
                    className="mb-6 max-w-3xl text-balance text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl"
                >
                    Recarga tu día,{" "}
                    <span className="md:block text-[#D9C5B2]">sin perder tu clase.</span>
                </h1>

                {/* Descripción */}
                <p className="mb-10 max-w-2xl text-balance text-lg text-white/80 md:text-xl">
                    Tu oasis de descanso entre clases. Pide desde tu dispositivo, salta la
                    fila y disfruta bajo la sombra.
                </p>

                {/* Acciones */}
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                    <button
                        type="button"
                        onClick={onOrderClick}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#D9C5B2] px-8 py-4 text-lg font-semibold text-[#1E1E1E] shadow-lg transition hover:bg-[#c8b29d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9C5B2] active:scale-95"
                    >
                        Ordenar ahora
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <Link
                        href={menuHref}
                        className="flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Ver menú completo
                    </Link>
                </div>
            </div>
        </section>
    );
}