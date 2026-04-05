'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

export default function TicketSearchPage() {
    const router = useRouter();
    const [uuid, setUuid] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🛡️ Validación básica de UUID (Formato: 8-4-4-4-12 caracteres)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!uuid.trim()) {
            toast.error('Ingresa un folio de rastreo');
            return;
        }

        if (!uuidRegex.test(uuid.trim())) {
            toast.error('El formato del UUID no es válido');
            return;
        }

        setIsSearching(true);
        const toastId = toast.loading('Rastreando firma digital...');

        try {
            // Verificamos si existe antes de saltar (Opcional, pero da mejor UX)
            const response = await api.get(`/tickets/${uuid.trim()}`);

            if (response.data) {
                toast.success('Ticket localizado', { id: toastId });
                // Redirigimos a la página pública que acabamos de crear
                router.push(`/ticket/${uuid.trim()}`);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'No se encontró el registro en la red', { id: toastId });
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6">

            {/* 📡 EFECTO DE RADAR DE FONDO */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="max-w-2xl w-full text-center relative z-10">
                <div className="mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6 shadow-2xl">
                        <span className="text-2xl">🧾</span>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-3">Rastreo de Operaciones</h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Protocolo de Auditoría // Ingrese UUID</p>
                </div>

                {/* 🔍 BARRA DE BÚSQUEDA TIPO TERMINAL */}
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity"></div>

                    <div className="relative flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={uuid}
                            onChange={(e) => setUuid(e.target.value)}
                            placeholder="00000000-0000-0000-0000-000000000000"
                            className="flex-1 bg-zinc-950 border border-zinc-800 text-white font-mono text-sm rounded-xl px-6 py-5 outline-none focus:border-blue-500 transition-all shadow-2xl placeholder:text-zinc-700"
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-xs px-8 py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
                        >
                            {isSearching ? 'Buscando...' : 'Localizar'}
                        </button>
                    </div>
                </form>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-40">
                    <div className="text-center">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Estatus</p>
                        <p className="text-[10px] font-mono text-zinc-300">Nodos Activos</p>
                    </div>
                    <div className="text-center border-x border-zinc-800">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Seguridad</p>
                        <p className="text-[10px] font-mono text-zinc-300">Encriptación SSL</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Región</p>
                        <p className="text-[10px] font-mono text-zinc-300">Cloud Central</p>
                    </div>
                </div>
            </div>

            {/* MARCA DE AGUA INFERIOR */}
            <div className="absolute bottom-10 flex items-center gap-2 opacity-20">
                <div className="h-[1px] w-12 bg-zinc-800"></div>
                <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.5em]">CAZA Engine Registry</p>
                <div className="h-[1px] w-12 bg-zinc-800"></div>
            </div>

        </div>
    );
}