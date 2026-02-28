import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden bg-zinc-950">

            {/* 1. Fondo con Imagen y Gradiente de Fusión */}
            <div className="absolute inset-0 z-0">
                <Image
                    className="object-cover object-center scale-105"
                    src="https://cdn.pixabay.com/photo/2019/02/22/12/31/fashion-4013456_1280.jpg"
                    alt="VASK8 Hero"
                    fill
                    priority
                />
                {/* Capas de Overlay: Negro hacia arriba y hacia abajo para fundir con el layout */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 2. Contenido Táctico */}
            <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

                {/* Badge de Temporada (Estilo Shein/Pro) */}
                <div className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full mb-6 animate-bounce">
                    <Zap className="h-3 w-3 fill-black" />
                    <span className="text-[10px] font-black uppercase tracking-widest">New Drop: Summer 2026</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black italic tracking-skate text-white uppercase leading-[0.85] mb-6">
                    Domina <br />
                    <span className="text-yellow-400">Las Calles</span>
                </h1>

                <p className="text-sm md:text-xl text-zinc-300 max-w-xl font-medium leading-relaxed mb-10">
                    Hardware de alta precisión para skaters que no perdonan el asfalto.
                    Encuentra las mejores refacciones con <span className="text-white border-b border-yellow-400">envío inmediato</span>.
                </p>

                {/* Botones con Glow */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href={'/products?take=10&skip=0'}
                        className="group flex items-center justify-center gap-2 px-10 py-5 bg-yellow-400 text-black font-black uppercase tracking-tighter rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-all hover:scale-105 active:scale-95"
                    >
                        Ver Catálogo
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href={'/auth/login'}
                        className="px-10 py-5 border-2 border-white/20 text-white font-black uppercase tracking-tighter rounded-full hover:bg-white hover:text-black hover:border-white transition-all active:scale-95"
                    >
                        Únete a la Crew
                    </Link>
                </div>

                {/* Stats Técnicos (Estilo Cyber-Interface) */}
                <div className="absolute bottom-10 left-6 hidden lg:flex gap-12">
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Stock</p>
                        <p className="text-white font-black italic">+500 Decks</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Shipping</p>
                        <p className="text-white font-black italic">24/48 Horas</p>
                    </div>
                </div>
            </div>
        </section>
    )
}