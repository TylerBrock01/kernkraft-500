'use client';

import { Calendar, CalendarDays, CalendarRange, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export type TimeframeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface TimeframeSelectorProps {
    value: TimeframeType;
    onChange: (value: TimeframeType) => void;
}

// 1. Aislamos la configuración fuera del render para evitar recreaciones innecesarias
const TIMEFRAMES = [
    { id: 'daily', label: 'Hoy', icon: CalendarDays },
    { id: 'weekly', label: 'Semana', icon: Calendar },
    { id: 'monthly', label: 'Mes', icon: CalendarRange },
    { id: 'yearly', label: 'Año', icon: Landmark },
] as const;

export default function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
    return (
        <div className="flex bg-zinc-900/80 p-1 rounded-lg border border-zinc-800/50 shadow-inner overflow-x-auto relative no-scrollbar">
            {TIMEFRAMES.map(({ id, label, icon: Icon }) => {
                const isActive = value === id;

                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        // 2. Simplificamos las clases: el color de texto reacciona al estado, el fondo se maneja con motion
                        className={`relative flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase transition-colors duration-300 z-10 ${
                            isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                        // Mejora a11y: Indicamos claramente el estado de selección a los lectores de pantalla
                        aria-pressed={isActive}
                    >
                        {/* 3. Animación acelerada por hardware (transform) para el fondo activo */}
                        {isActive && (
                            <motion.div
                                layoutId="active-timeframe-pill"
                                className="absolute inset-0 bg-zinc-800 border border-zinc-700/50 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.2)] -z-10"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <Icon size={14} aria-hidden="true" />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}