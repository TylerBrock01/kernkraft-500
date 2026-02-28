import Link from "next/link";
import { cn } from "@/src/utils";

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <Link
            href={'/'}
            className={cn(
                "group flex flex-col md:flex-row md:items-baseline gap-1 select-none",
                className
            )}
        >
            {/* Parte Principal: Estilo Pesado e Itálico */}
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase transition-transform group-hover:scale-105 duration-300">
                Skate<span className="text-zinc-500">Shop</span>
            </h1>

            {/* Marca de Acento: VASK8 con efecto de bloque */}
            <span className="bg-yellow-400 text-black text-xs md:text-sm font-black px-2 py-0.5 italic tracking-tighter uppercase transform -skew-x-12 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all">
        VASK8
      </span>
        </Link>
    );
}