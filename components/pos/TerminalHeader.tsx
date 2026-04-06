import React from 'react';
import { useRouter } from 'next/navigation';

interface TerminalHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function TerminalHeader({ searchTerm, setSearchTerm }: TerminalHeaderProps) {
    const router = useRouter();

    return (
        <header className="min-h-[4rem] py-3 md:py-0 border-b border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 shrink-0 gap-3 z-30">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <button onClick={() => router.push('/dashboard')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors shrink-0">
                    ←
                </button>
                <h1 className="font-black text-base md:text-lg tracking-widest uppercase truncate">Terminal CAZA</h1>
            </div>
            <div className="flex items-center w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar producto (F2)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none focus:border-emerald-500 w-full sm:w-64 transition-all"
                    />
                </div>
            </div>
        </header>
    );
}