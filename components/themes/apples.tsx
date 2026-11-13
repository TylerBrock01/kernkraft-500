"use client";

import React, { useState } from "react";

interface Producto {
    id: number;
    nombre: string;
    eslogan: string;
    precio: string;
    fondo: string;
    textoOscuro?: boolean;
}

const PRODUCTOS: Producto[] = [
    {
        id: 1,
        nombre: "MacBook Air",
        eslogan: "Superligera. Superpotente con chip M4.",
        precio: "Desde $22,999 MXN",
        fondo: "bg-[#f5f5f7]",
        textoOscuro: true,
    },
    {
        id: 2,
        nombre: "iPad Pro",
        eslogan: "Increíblemente delgado. Poder desmedido.",
        precio: "Desde $21,499 MXN",
        fondo: "bg-black",
        textoOscuro: false,
    },
    {
        id: 3,
        nombre: "Apple Watch Series 11",
        eslogan: "Más delgado. Más brillante. Más tuyo.",
        precio: "Desde $9,499 MXN",
        fondo: "bg-[#f5f5f7]",
        textoOscuro: true,
    },
    {
        id: 4,
        nombre: "AirPods Pro",
        eslogan: "Cancelación Activa de Ruido de otro nivel.",
        precio: "$5,799 MXN",
        fondo: "bg-zinc-900",
        textoOscuro: false,
    },
];

const COLORES_IPHONE = [
    { nombre: "Titanio Natural", clase: "from-stone-400 to-stone-600", hex: "#9a958e" },
    { nombre: "Titanio Azul", clase: "from-slate-600 to-blue-950", hex: "#2f3e52" },
    { nombre: "Titanio Blanco", clase: "from-zinc-100 to-zinc-300", hex: "#e4e4e7" },
    { nombre: "Titanio Negro", clase: "from-zinc-700 to-black", hex: "#27272a" },
];

export default function AppleDemoPage() {
    const [colorSeleccionado, setColorSeleccionado] = useState(COLORES_IPHONE[0]);
    const [bolsa, setBolsa] = useState<string[]>([]);
    const [mensaje, setMensaje] = useState<string | null>(null);

    const agregarABolsa = (producto: string) => {
        setBolsa([...bolsa, producto]);
        setMensaje(`Agregaste "${producto}" a tu bolsa.`);
        setTimeout(() => setMensaje(null), 3000);
    };

    return (
        <div className="min-h-screen bg-white text-[#1d1d1f] font-sans antialiased">
            {/* Barra de navegación estilo Apple */}
            <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md text-gray-200 text-xs">
                <nav className="max-w-5xl mx-auto px-4 h-11 flex items-center justify-between">
                    {/* Logo Apple SVG */}
                    <a href="#" className="hover:text-white transition" aria-label="Inicio">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.06-7.89-9.19-16.95-12.39-27.17-3.2-10.22-4.8-20.06-4.8-29.53 0-11.12 2.78-20.53 8.33-28.23 5.55-7.7 12.63-11.66 21.24-11.88 4.69 0 9.95 1.37 15.79 4.1 5.83 2.74 9.58 4.15 11.25 4.24 1.34 0 5.45-1.63 12.33-4.88 6.88-3.25 12.68-4.63 17.41-4.14 13.19 1.06 23.11 6.26 29.76 15.6-11.85 7.19-17.68 17.16-17.48 29.92.19 9.96 3.91 18.23 11.15 24.81 4.91 4.52 10.67 7.36 17.28 8.53-1.39 4.35-3.04 8.59-4.96 12.73zM119.22 31.91c0 7.77-2.84 15.02-8.52 21.74-6.85 8.01-15.13 12.63-24.11 11.9-.15-.95-.23-1.96-.23-3.04 0-7.46 3.24-15.44 9.01-21.97 2.88-3.31 6.55-6.06 11.01-8.26 4.46-2.19 8.68-3.41 12.66-3.65.12 1.13.18 2.22.18 3.28z" />
                        </svg>
                    </a>

                    <div className="hidden sm:flex space-x-8">
                        <a href="#iphone" className="hover:text-white transition">iPhone</a>
                        <a href="#productos" className="hover:text-white transition">Mac</a>
                        <a href="#productos" className="hover:text-white transition">iPad</a>
                        <a href="#productos" className="hover:text-white transition">Watch</a>
                        <a href="#productos" className="hover:text-white transition">AirPods</a>
                    </div>

                    <div className="flex items-center space-x-4">
            <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-medium">
              Bolsa ({bolsa.length})
            </span>
                    </div>
                </nav>
            </header>

            {/* Notificación flotante al agregar producto */}
            {mensaje && (
                <div className="fixed bottom-5 right-5 z-50 bg-zinc-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg border border-zinc-700">
                    ✓ {mensaje}
                </div>
            )}

            {/* Sección Principal (Hero): iPhone */}
            <section id="iphone" className="bg-black text-white py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <p className="text-orange-400 text-sm font-semibold tracking-wide uppercase mb-2">
                        Nuevo
                    </p>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-3">
                        iPhone 17 Pro
                    </h1>
                    <p className="text-lg sm:text-2xl text-gray-300 mb-6">
                        Forjado en titanio. Diseñado para Apple Intelligence.
                    </p>

                    <div className="flex justify-center gap-4 mb-10">
                        <button
                            onClick={() => agregarABolsa(`iPhone 17 Pro (${colorSeleccionado.nombre})`)}
                            className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer"
                        >
                            Comprar
                        </button>
                        <a
                            href="#productos"
                            className="border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff] hover:text-white px-5 py-2 rounded-full text-sm font-medium transition"
                        >
                            Más información
                        </a>
                    </div>

                    {/* Vista previa interactiva de color */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-48 h-80 rounded-[2.5rem] bg-gradient-to-b ${colorSeleccionado.clase} p-2 shadow-2xl border border-white/20 transition-all duration-500`}
                        >
                            <div className="w-full h-full bg-zinc-950 rounded-[2.1rem] flex flex-col items-center justify-between p-4">
                                <div className="w-16 h-4 bg-black rounded-full border border-zinc-800" />
                                <span className="text-xs text-zinc-400 font-medium">
                  {colorSeleccionado.nombre}
                </span>
                                <div className="w-12 h-1 bg-zinc-700 rounded-full" />
                            </div>
                        </div>

                        {/* Selector de acabados */}
                        <div className="mt-6 flex items-center gap-3">
                            {COLORES_IPHONE.map((color) => (
                                <button
                                    key={color.nombre}
                                    onClick={() => setColorSeleccionado(color)}
                                    title={color.nombre}
                                    style={{ backgroundColor: color.hex }}
                                    className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${
                                        colorSeleccionado.nombre === color.nombre
                                            ? "border-blue-500 scale-110"
                                            : "border-transparent opacity-75 hover:opacity-100"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Acabado seleccionado: {colorSeleccionado.nombre}
                        </p>
                    </div>
                </div>
            </section>

            {/* Cuadrícula de Productos */}
            <section id="productos" className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PRODUCTOS.map((prod) => (
                        <div
                            key={prod.id}
                            className={`${prod.fondo} ${
                                prod.textoOscuro ? "text-[#1d1d1f]" : "text-white"
                            } rounded-3xl p-10 flex flex-col items-center text-center justify-between min-h-[360px] transition hover:scale-[1.01]`}
                        >
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-2">
                                    {prod.nombre}
                                </h2>
                                <p
                                    className={`text-base mb-2 ${
                                        prod.textoOscuro ? "text-gray-600" : "text-gray-300"
                                    }`}
                                >
                                    {prod.eslogan}
                                </p>
                                <p className="text-sm font-medium opacity-80 mb-6">
                                    {prod.precio}
                                </p>
                            </div>

                            <button
                                onClick={() => agregarABolsa(prod.nombre)}
                                className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer"
                            >
                                Agregar a la bolsa
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pie de página */}
            <footer className="bg-[#f5f5f7] text-gray-500 text-xs py-8 px-4 mt-12 border-t border-gray-200">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>Derechos reservados UDTICTAC 2026</p>
                    <p>Este sitio es sólo con fines académicos para prácticas de la herramienta Sites</p>
                    <div className="flex gap-4">
                        <span>Privacidad</span>
                        <span>Términos de uso</span>
                        <span>Mapa del sitio</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}