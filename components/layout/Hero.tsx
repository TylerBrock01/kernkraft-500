import React from 'react';

const HERO_IMAGE_URL = "https://res.cloudinary.com/tyler-brock/image/upload/v1775171091/CazaHeroImage_gi6wai.jpg";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center overflow-hidden">

            {/* 🖼️ CAPA DE IMAGEN DE FONDO */}
            <div className="absolute inset-0 z-0">
                <img
                    src={HERO_IMAGE_URL}
                    alt="CAZA Agency Background"
                    className="w-full h-full object-cover grayscale-[100%]"
                />
                {/* Capa de degradado para oscurecer y dar profundidad */}
                <div className="absolute inset-0 bg-linear-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>
                <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-zinc-950"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Etiqueta sutil superior */}
                <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                    Universal Commerce Engine
                </div>

                {/* Título masivo y serio */}
                <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-100 tracking-tighter mb-8 drop-shadow-2xl">
                    CRUX AERO <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
            ZENITH Agency
          </span>
                </h1>

                {/* Descripción directa */}
                <p className="mt-4 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Arquitectura de software de alta precisión. Construimos los motores
                    que impulsan el comercio moderno bajo una visión estética y funcional.
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-10 py-4 rounded-sm bg-zinc-100 text-zinc-950 font-bold hover:bg-white transition-all uppercase tracking-widest text-xs">
                        Solicitar Demo
                    </button>
                    <button className="w-full sm:w-auto px-10 py-4 rounded-sm bg-transparent border border-zinc-700 text-zinc-300 font-bold hover:bg-zinc-900/50 hover:text-white transition-all uppercase tracking-widest text-xs backdrop-blur-sm">
                        Explorar el Motor
                    </button>
                </div>
            </div>

            {/* Efecto decorativo inferior para suavizar el paso a la siguiente sección */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </section>
    );
}