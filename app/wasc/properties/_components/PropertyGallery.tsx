'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
    images: string[];
    title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-4">
            {/* Foto Principal Activa */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="relative h-[24rem] sm:h-[30rem] w-full rounded-3xl overflow-hidden cursor-pointer group bg-gray-100 border border-gray-100 shadow-sm"
            >
                <Image
                    src={images[selectedImage]}
                    alt={`${title} - Vista ${selectedImage + 1}`}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                />

                {/* Overlay e indicador de clic */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <button
                    type="button"
                    className="absolute bottom-4 right-4 bg-gray-900/80 hover:bg-gray-900 text-white backdrop-blur-md text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                    <span>🔍</span> Ver pantalla completa ({images.length} fotos)
                </button>
            </div>

            {/* Carrusel de Miniaturas */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(idx)}
                        className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden transition-all duration-200 border-2 ${
                            selectedImage === idx
                                ? 'border-red-500 scale-[0.98] ring-2 ring-red-500/20'
                                : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                        <Image
                            src={img}
                            alt={`${title} miniatura ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 15vw"
                        />
                    </button>
                ))}
            </div>

            {/* Modal Lightbox a Pantalla Completa */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
                    {/* Barra Superior del Modal */}
                    <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
                        <span className="text-sm font-medium text-gray-300">
                            {selectedImage + 1} / {images.length} — {title}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors text-lg"
                            aria-label="Cerrar vista"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Foto en Grande dentro del Modal */}
                    <div className="relative flex-1 max-w-6xl w-full mx-auto my-4">
                        <Image
                            src={images[selectedImage]}
                            alt={`${title} en alta resolución`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>

                    {/* Controles Inferiores del Modal */}
                    <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto w-full pt-2">
                        <button
                            type="button"
                            onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md"
                        >
                            ← Anterior
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md"
                        >
                            Siguiente →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}