'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/axios/axios'; // Asegúrate de que esta ruta apunte a tu instancia de Axios
import { TrendingUp, TrendingDown, Activity, AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

// Definimos la interfaz basada en la respuesta exacta de tu backend
interface FinancialPulseData {
    revenue: number;
    operatingExpenses: number;
    waste: number;
    netProfit: number;
    timestamp?: string;
}

export default function FinancialPulseCard() {
    const [data, setData] = useState<FinancialPulseData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPulse = async () => {
            try {
                const response = await api.get('/analytics/financial-pulse');
                // Asumiendo que tu backend devuelve { timestamp, businessId, data: { revenue... } }
                setData(response.data.data);
            } catch (error) {
                console.error('Error cargando pulso financiero:', error);
                // Fallback en caso de error de red
                setData({ revenue: 0, operatingExpenses: 0, waste: 0, netProfit: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPulse();

        // Auto-recarga cada 5 minutos
        const interval = setInterval(fetchPulse, 300000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading || !data) {
        return (
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 h-64 animate-pulse flex flex-col justify-between">
                <div className="h-4 w-1/3 bg-zinc-800/50 rounded"></div>
                <div className="h-12 w-1/2 bg-zinc-800/50 rounded"></div>
                <div className="h-2 w-full bg-zinc-800/50 rounded"></div>
            </div>
        );
    }

    // Cálculos visuales
    const isNegative = data.netProfit < 0;
    const isRisk = data.revenue > 0 && data.operatingExpenses > data.revenue * 0.7; // Alerta si gastos superan el 70%

    // Matemáticas para la barra de progreso (evitando división por cero)
    const totalBase = data.revenue > 0 ? data.revenue : 1; // Previene Infinity/NaN
    const profitPercent = Math.max(0, (data.netProfit / totalBase) * 100);
    const expensePercent = Math.min(100, (data.operatingExpenses / totalBase) * 100);
    const wastePercent = Math.min(100, (data.waste / totalBase) * 100);

    return (
        <div className={`relative overflow-hidden bg-zinc-900/40 border ${isRisk ? 'border-amber-500/30' : 'border-zinc-800/80'} rounded-2xl p-6 group transition-all duration-300 hover:bg-zinc-900/60`}>

            {/* Brillo de fondo estético */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 ${isNegative ? 'bg-red-500/5 group-hover:bg-red-500/10' : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'}`}></div>

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity size={14} className={isRisk ? 'text-amber-500' : 'text-zinc-500'} />
                    Pulso Financiero
                </h3>
                {isRisk && (
                    <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            <AlertTriangle size={10} /> Riesgo Operativo
          </span>
                )}
            </div>

            {/* METRICA PRINCIPAL (GANANCIA LIBRE) */}
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Utilidad Neta (Libre)</p>
                    <div className="flex items-end gap-3">
                        <h2 className={`text-4xl font-black font-mono tracking-tight ${isNegative ? 'text-red-500' : 'text-emerald-400'}`}>
                            ${data.netProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>
                <div className={`p-2.5 rounded-xl border ${isNegative ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                    {isNegative ? <TrendingDown size={24} /> : <TrendingUp size={24} />}
                </div>
            </div>

            {/* BARRA VISUAL DE DESGLOSE (EL MOTOR) */}
            <div className="space-y-4">
                {/* La Barra */}
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden flex border border-zinc-800/50">
                    <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${profitPercent}%` }} title="Ganancia"></div>
                    <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${expensePercent}%` }} title="Gastos"></div>
                    <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${wastePercent}%` }} title="Mermas"></div>
                </div>

                {/* Leyendas de la barra */}
                <div className="grid grid-cols-3 gap-2">
                    {/* Ingresos Brutos */}
                    <div className="bg-zinc-950/50 rounded-lg p-2 border border-zinc-800/50">
                        <div className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1">
                            <ArrowUpRight size={10} className="text-blue-400" /> Ingresos
                        </div>
                        <div className="text-xs font-mono font-bold text-zinc-300">
                            ${data.revenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Gastos */}
                    <div className="bg-zinc-950/50 rounded-lg p-2 border border-zinc-800/50">
                        <div className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1">
                            <ArrowDownRight size={10} className="text-red-400" /> Gastos
                        </div>
                        <div className="text-xs font-mono font-bold text-zinc-300">
                            ${data.operatingExpenses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Mermas */}
                    <div className="bg-zinc-950/50 rounded-lg p-2 border border-zinc-800/50">
                        <div className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1">
                            <ArrowDownRight size={10} className="text-amber-400" /> Mermas
                        </div>
                        <div className="text-xs font-mono font-bold text-zinc-300">
                            ${data.waste.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}