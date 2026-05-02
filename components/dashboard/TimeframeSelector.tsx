'use client';

// 🛡️ FIX: Importamos el ícono Landmark para el año
import { Calendar, CalendarDays, CalendarRange, Landmark } from 'lucide-react';

export type TimeframeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface TimeframeSelectorProps {
    value: TimeframeType;
    onChange: (value: TimeframeType) => void;
}

export default function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
    return (
        // 🛡️ FIX: Agregamos overflow-x-auto para responsividad en móviles
        <div className="flex bg-zinc-900/80 p-1 rounded-lg border border-zinc-800/50 shadow-inner overflow-x-auto">

            {/* BOTÓN: HOY */}
            <button
                onClick={() => onChange('daily')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    value === 'daily'
                        ? 'bg-zinc-800 text-emerald-400 shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-zinc-700/50'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
            >
                <CalendarDays size={14} /> Hoy
            </button>

            {/* BOTÓN: SEMANA */}
            <button
                onClick={() => onChange('weekly')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    value === 'weekly'
                        ? 'bg-zinc-800 text-emerald-400 shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-zinc-700/50'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
            >
                <Calendar size={14} /> Semana
            </button>

            {/* BOTÓN: MES */}
            <button
                onClick={() => onChange('monthly')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    value === 'monthly'
                        ? 'bg-zinc-800 text-emerald-400 shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-zinc-700/50'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
            >
                <CalendarRange size={14} /> Mes
            </button>

            {/* 🛡️ NUEVO BOTÓN: AÑO */}
            <button
                onClick={() => onChange('yearly')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    value === 'yearly'
                        ? 'bg-zinc-800 text-emerald-400 shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-zinc-700/50'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
            >
                <Landmark size={14} /> Año
            </button>

        </div>
    );
}