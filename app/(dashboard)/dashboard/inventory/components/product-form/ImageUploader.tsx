'use client';

import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { uploadProductImages } from '@/app/features/inventory/services/inventory.service';
import { getErrorMessage } from '@/app/lib/get-error-message';

interface Props {
    images: string[];
    onAdd: (urls: string[]) => void;
    onRemove: (index: number) => void;
    onUploadingChange: (isUploading: boolean) => void;
}

// En algunos navegadores los HEIC llegan sin `type`, por eso también se revisa la extensión
const isImageFile = (file: File) => file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name);

export function ImageUploader({ images, onAdd, onRemove, onUploadingChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (selected: File[]) => {
        const files = selected.filter(isImageFile);
        if (files.length === 0) {
            setError('Solo se permiten imágenes.');
            return;
        }

        setError(null);
        setIsUploading(true);
        onUploadingChange(true);
        try {
            onAdd(await uploadProductImages(files));
        } catch (err) {
            setError(getErrorMessage(err, 'No se pudieron subir las imágenes.'));
        } finally {
            setIsUploading(false);
            onUploadingChange(false);
        }
    };

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.target.value = ''; // permite volver a elegir el mismo archivo
        if (files.length > 0) void upload(files);
    };

    const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) void upload(files);
    };

    return (
        <div>
      <span className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        Galería Fotográfica
      </span>

            {images.length > 0 && (
                <ul className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {images.map((url, index) => (
                        <li
                            key={`${url}-${index}`}
                            className="relative h-24 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                        >
                            <img src={url} alt="" className="h-full w-full object-cover" />

                            {index === 0 && (
                                <span className="absolute bottom-1 left-1 z-10 rounded bg-zinc-950/80 px-1.5 py-0.5 font-mono text-[8px] text-zinc-300">
                  Portada
                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                aria-label={`Eliminar imagen ${index + 1}`}
                                className="absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
                            >
                                <span aria-hidden>✕</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Es un <button>: se alcanza con teclado y también acepta drag & drop */}
            <button
                type="button"
                disabled={isUploading}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all disabled:cursor-wait ${
                    isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50'
                }`}
            >
                {isUploading ? (
                    <span role="status" className="flex flex-col items-center">
            <span className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span className="font-mono text-xs text-zinc-400">Subiendo a la nube...</span>
          </span>
                ) : (
                    <span className="px-4 text-center">
            <span aria-hidden className="mb-1 block text-xl opacity-50">📸</span>
            <span className="block text-xs font-medium text-zinc-400">Arrastra imágenes o toca aquí</span>
            <span className="mt-0.5 block text-[10px] text-zinc-600">Puedes seleccionar varias a la vez</span>
          </span>
                )}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleSelect}
            />

            {error && (
                <p role="alert" className="mt-2 font-mono text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}