'use client';

import { useEffect, useRef } from 'react';

/** Ejecuta `onEscape` cuando se pulsa Escape, mientras `enabled` sea true. */
export function useEscapeKey(enabled: boolean, onEscape: () => void) {
    const handlerRef = useRef(onEscape);

    // Siempre el último callback, sin volver a registrar el listener en cada render
    useEffect(() => {
        handlerRef.current = onEscape;
    });

    useEffect(() => {
        if (!enabled) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handlerRef.current();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enabled]);
}