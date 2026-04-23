'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/app/lib/axios/axios';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Lock } from 'lucide-react';
import { ApexOptions } from 'apexcharts';

// 🛡️ Importación dinámica para evitar errores SSR en Next.js
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface FinancialPulseData {
    revenue: number;
    operatingExpenses: number;
    waste: number;
    netProfit: number;
    timestamp?: string;
    heldDeposits: number; // 👈 Nuestra nueva variable de pasivo
}

export default function FinancialPulseCard({ timeframe }: { timeframe: string }) {
    const [data, setData] = useState<FinancialPulseData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPulse = async () => {
            try {
                const response = await api.get(`/analytics/financial-pulse?period=${timeframe}`);
                setData(response.data.data);
            } catch (error) {
                console.error('Error cargando pulso financiero:', error);
                // 🛡️ Prevenimos errores añadiendo heldDeposits al fallback
                setData({ revenue: 0, operatingExpenses: 0, waste: 0, netProfit: 0, heldDeposits: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPulse();
        const interval = setInterval(fetchPulse, 300000); // 5 min
        return () => clearInterval(interval);
    }, [timeframe]);

    if (isLoading || !data) {
        return (
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 h-[400px] animate-pulse flex flex-col justify-between">
                <div className="h-4 w-1/3 bg-zinc-800/50 rounded"></div>
                <div className="h-32 w-32 rounded-full bg-zinc-800/50 mx-auto mt-4"></div>
                <div className="h-2 w-full bg-zinc-800/50 rounded mt-4"></div>
            </div>
        );
    }

    // Lógica de Riesgos
    const isNegative = data.netProfit < 0;
    const isRisk = data.revenue > 0 && data.operatingExpenses > data.revenue * 0.7;

    // 🍩 CONFIGURACIÓN DE LA DONA (APEXCHARTS)
    // NOTA CONTABLE: Fíjate que NO metemos heldDeposits a la dona. La dona es puramente P&L (Estado de Resultados).
    const chartSeries = [
        Math.max(0, data.netProfit),
        data.operatingExpenses,
        data.waste
    ];

    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut',
            background: 'transparent',
            animations: {
                enabled: true,
                speed: 800,
            }
        },
        theme: { mode: 'dark' },
        labels: ['Utilidad Libre', 'Gastos Operativos', 'Mermas'],
        colors: ['#10B981', '#F43F5E', '#F59E0B'], // Esmeralda, Rojo, Ámbar
        stroke: {
            show: true,
            colors: ['#18181B'],
            width: 2
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (value) => `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            color: '#71717A',
                            fontSize: '10px',
                            fontWeight: 700,
                        },
                        value: {
                            color: '#F4F4F5',
                            fontSize: '18px',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            formatter: (val) => `$${Number(val).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'INGRESOS BRUTOS',
                            color: '#71717A',
                            fontSize: '9px',
                            fontWeight: 800,
                            // El centro de la dona sigue mostrando el Revenue real, sin inflarse por depósitos.
                            formatter: () => `$${data.revenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                        }
                    }
                }
            }
        }
    };

    return (
        <div className={`relative overflow-hidden bg-zinc-900/40 border ${isRisk ? 'border-amber-500/30' : 'border-zinc-800/80'} rounded-2xl p-6 group transition-all duration-300 hover:bg-zinc-900/60`}>

            {/* Brillo de fondo estético */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 pointer-events-none ${isNegative ? 'bg-red-500/5 group-hover:bg-red-500/10' : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'}`}></div>

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity size={14} className={isRisk ? 'text-amber-500' : 'text-zinc-500'} />
                    Pulso Financiero
                </h3>
                {isRisk && (
                    <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <AlertTriangle size={10} /> Riesgo
                    </span>
                )}
            </div>

            {/* MÉTRICA PRINCIPAL */}
            <div className="mb-4 flex justify-between items-end relative z-10">
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Utilidad Neta Libre</p>
                    <div className="flex items-end gap-3">
                        <h2 className={`text-3xl font-black font-mono tracking-tight ${isNegative ? 'text-red-500' : 'text-emerald-400'}`}>
                            ${data.netProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>
                <div className={`p-2.5 rounded-xl border ${isNegative ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                    {isNegative ? <TrendingDown size={24} /> : <TrendingUp size={24} />}
                </div>
            </div>

            {/* GRÁFICO DE DONA */}
            <div className="relative z-10 flex justify-center items-center h-[200px] -mt-2 mb-2">
                {data.revenue === 0 ? (
                    <div className="text-zinc-600 text-xs uppercase font-bold tracking-widest text-center">
                        No hay ingresos registrados hoy
                    </div>
                ) : (
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="donut"
                        height={240}
                    />
                )}
            </div>

            {/* 🧠 LEYENDAS INFERIORES CON GRID DINÁMICO */}
            <div className={`grid gap-2 relative z-10 ${data.heldDeposits > 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>

                {/* 1. UTILIDAD */}
                <div className="bg-zinc-950/50 rounded-lg p-2 border border-emerald-500/10">
                    <div className="flex items-center gap-1 text-[9px] text-emerald-500 uppercase font-bold tracking-wider mb-1">
                        <ArrowUpRight size={10} /> Utilidad
                    </div>
                    <div className="text-xs font-mono font-bold text-zinc-300">
                        ${data.netProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                {/* 2. GASTOS */}
                <div className="bg-zinc-950/50 rounded-lg p-2 border border-red-500/10">
                    <div className="flex items-center gap-1 text-[9px] text-red-400 uppercase font-bold tracking-wider mb-1">
                        <ArrowDownRight size={10} /> Gastos
                    </div>
                    <div className="text-xs font-mono font-bold text-zinc-300">
                        ${data.operatingExpenses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                {/* 3. MERMAS */}
                <div className="bg-zinc-950/50 rounded-lg p-2 border border-amber-500/10">
                    <div className="flex items-center gap-1 text-[9px] text-amber-400 uppercase font-bold tracking-wider mb-1">
                        <ArrowDownRight size={10} /> Mermas
                    </div>
                    <div className="text-xs font-mono font-bold text-zinc-300">
                        ${data.waste.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                {/* 🔒 4. DEPÓSITOS RETENIDOS (Aparece solo si hay dinero retenido) */}
                {data.heldDeposits > 0 && (
                    <div className="bg-zinc-950/50 rounded-lg p-2 border border-cyan-500/20 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]">
                        <div className="flex items-center gap-1 text-[9px] text-cyan-400 uppercase font-bold tracking-wider mb-1">
                            <Lock size={10} /> Pasivo (Depósito)
                        </div>
                        <div className="text-xs font-mono font-bold text-zinc-300">
                            ${data.heldDeposits.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}