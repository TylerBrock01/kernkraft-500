import React, { useState, useEffect } from 'react';

interface SearchInputProps {
    onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
    const [term, setTerm] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(term);
        }, 500); // Espera 500ms tras dejar de escribir

        return () => clearTimeout(delayDebounceFn);
    }, [term, onSearch]);

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-zinc-500 text-sm">🔍</span>
            </div>
            <input
                type="text"
                placeholder="Buscar por nombre, tipo o atributo..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all font-medium"
            />
        </div>
    );
}