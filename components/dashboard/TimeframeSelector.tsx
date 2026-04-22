'use client';

import { Calendar, CalendarDays, CalendarRange } from 'lucide-react';

// 🛡️ TIPADO ESTRICTO: Exportamos esto para que el Padre lo use
export type TimeframeType = 'daily' | 'weekly' | 'monthly';

// Definimos el "Control Remoto" que el Padre nos va a pasar
interface TimeframeSelectorProps {
    value: TimeframeType;
    onChange: (value: TimeframeType) => void;
}

export default function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
    return (
        <div className="flex bg-zinc-900/80 p-1 rounded-lg border border-zinc-800/50 shadow-inner">

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

        </div>
    );
}