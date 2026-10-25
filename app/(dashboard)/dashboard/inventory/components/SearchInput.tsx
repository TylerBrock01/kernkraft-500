'use client';

import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
    onSearch: (value: string) => void;
    delay?: number; // ms de espera tras dejar de escribir
}

export default function SearchInput({ onSearch, delay = 400 }: SearchInputProps) {
    const [term, setTerm] = useState('');
    const onSearchRef = useRef(onSearch);
    const lastEmitted = useRef('');

    // Siempre el último callback: ya no importa si el padre lo memoiza o no
    useEffect(() => {
        onSearchRef.current = onSearch;
    });

    useEffect(() => {
        const value = term.trim();
        // Nada nuevo que buscar (incluye el montaje inicial y los espacios sueltos)
        if (value === lastEmitted.current) return;

        const timer = setTimeout(() => {
            lastEmitted.current = value;
            onSearchRef.current(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [term, delay]);

    return (
        <div className="relative w-full max-w-md">
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-zinc-500">
        🔍
      </span>
            <input
                type="search"
                name="search"
                aria-label="Buscar productos"
                autoComplete="off"
                enterKeyHint="search"
                placeholder="Buscar por nombre, tipo o atributo..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-3 text-xs font-medium text-zinc-100 placeholder-zinc-500 transition-all focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
        </div>
    );
}