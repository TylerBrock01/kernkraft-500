// /hmcs/_components/HmcsHero.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
            className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center md:py-24"
        >
            {/* Estado del restaurante */}
            <div
                role="status"
                className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    isOpen
                        ? "bg-[#D9C5B2]/30 text-[#2C4A3E]"
                        : "bg-red-100 text-red-800"
                }`}
            >
        <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${
                isOpen
                    ? "animate-pulse bg-[#2C4A3E] motion-reduce:animate-none"
                    : "bg-red-600"
            }`}
        />
                {isOpen ? "Abierto ahora" : "Cerrado"} · {location}
            </div>

            {/* Título */}
            <h1
                id="hero-title"
                className="mb-6 max-w-3xl text-balance text-5xl font-extrabold leading-[1.1] tracking-tight text-[#1E1E1E] md:text-7xl"
            >
                Recarga tu día,{" "}
                <span className="md:block">sin perder tu clase.</span>
            </h1>

            {/* Descripción */}
            <p className="mb-10 max-w-2xl text-balance text-lg text-[#1E1E1E]/70 md:text-xl">
                Tu oasis de descanso entre clases. Pide desde tu dispositivo, salta la
                fila y disfruta bajo la sombra.
            </p>

            {/* Acciones */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <button
                    type="button"
                    onClick={onOrderClick}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#2C4A3E] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#2C4A3E]/20 transition hover:bg-[#1f352c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E] active:scale-95"
                >
                    Ordenar ahora
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>

                <Link
                    href={menuHref}
                    className="flex items-center justify-center rounded-xl border-2 border-[#2C4A3E]/20 px-8 py-4 text-lg font-semibold text-[#2C4A3E] transition-colors hover:border-[#2C4A3E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E]"
                >
                    Ver menú completo
                </Link>
            </div>
        </section>
    );
}