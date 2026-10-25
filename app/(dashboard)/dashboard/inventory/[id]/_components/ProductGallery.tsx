'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    images: string[];
    alt: string;
}

export function ProductGallery({ images, alt }: Props) {
    const [selected, setSelected] = useState(0);
    // Si la lista cambia (p. ej. tras editar) y el índice ya no existe, cae a la primera
    const current = images[selected] ?? images[0];

    return (
        <div className="relative flex w-full flex-col justify-between overflow-hidden border-b border-zinc-800 bg-black/40 md:w-2/5 md:border-b-0 md:border-r">
            <div className="relative flex h-80 w-full items-center justify-center overflow-hidden bg-zinc-950/60 p-4 md:h-[420px]">
                {current ? (
                    <>
                        {/* Fondo blur para que no queden bordes vacíos */}
                        <img
                            src={current}
                            alt=""
                            aria-hidden
                            className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-20 blur-2xl"
                        />
                        <motion.img
                            key={current}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            src={current}
                            alt={alt}
                            className="z-10 max-h-full max-w-full object-contain drop-shadow-2xl"
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center text-center opacity-30">
                        <span aria-hidden className="mb-3 text-6xl">📸</span>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Sin Imagen</p>
                    </div>
                )}
                <div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {images.length > 1 && (
                <div className="z-30 flex shrink-0 gap-2 overflow-x-auto border-t border-zinc-800 bg-zinc-950/90 p-3">
                    {images.map((url, idx) => (
                        <button
                            key={`${url}-${idx}`}
                            type="button"
                            onClick={() => setSelected(idx)}
                            aria-label={`Ver imagen ${idx + 1} de ${images.length}`}
                            aria-pressed={selected === idx}
                            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                selected === idx
                                    ? 'scale-95 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                                    : 'border-zinc-800 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <img src={url} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}