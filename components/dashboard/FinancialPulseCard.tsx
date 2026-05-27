'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { api } from '@/app/lib/axios/axios';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Lock } from 'lucide-react';
import { ApexOptions } from 'apexcharts';

// 🛡️ Importación dinámica para CSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type TimeframeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface FinancialPulseData {
    revenue: number;
    operatingExpenses: number;
    waste: number;
    netProfit: number;
    timestamp?: string;
    heldDeposits: number;
}

// ==========================================
// 1. HOOK AISLADO: Lógica de Datos y Polling
// ==========================================
function useFinancialPulse(timeframe: string) {
    const [data, setData] = useState<FinancialPulseData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPulse = async () => {
            try {
                const response = await api.get(`/analytics/financial-pulse?period=${timeframe}`);
                setData(response.data.data);
            } catch (error) {
                console.error('Error cargando pulso financiero:', error);
                setData({ revenue: 0, operatingExpenses: 0, waste: 0, netProfit: 0, heldDeposits: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPulse();
        const interval = setInterval(fetchPulse, 300000); // 5 min
        return () => clearInterval(interval);
    }, [timeframe]);

    return { data, isLoading };
}

// ==========================================
// 2. CONFIGURACIÓN ANIMACIONES (Framer Motion)
// ==========================================
const gridVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
};

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
export default function FinancialPulseCard({ timeframe }: { timeframe: string }) {
    const { data, isLoading } = useFinancialPulse(timeframe);

    // Memorizamos la configuración del gráfico para evitar re-renders pesados
    const { chartOptions, chartSeries } = useMemo(() => {
        if (!data) return { chartOptions: {}, chartSeries: [] };

        const series = [Math.max(0, data.netProfit), data.operatingExpenses, data.waste];
        const options: ApexOptions = {
            chart: { type: 'donut', background: 'transparent', animations: { enabled: true, speed: 800 } },
            theme: { mode: 'dark' },
            labels: ['Utilidad Libre', 'Gastos Operativos', 'Mermas'],
            colors: ['#10B981', '#F43F5E', '#F59E0B'],
            stroke: { show: true, colors: ['#18181B'], width: 2 },
            dataLabels: { enabled: false },
            legend: { show: false },
            tooltip: { theme: 'dark', y: { formatter: (v) => `$${v.toLocaleString('es-MX', { minimumFractionDigits: 2 })}` } },
            plotOptions: {
                pie: {
                    donut: {
                        size: '75%',
                        labels: {
                            show: true,
                            name: { color: '#71717A', fontSize: '10px', fontWeight: 700 },
                            value: {
                                color: '#F4F4F5', fontSize: '18px', fontWeight: 800, fontFamily: 'monospace',
                                formatter: (val) => `$${Number(val).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                            },
                            total: {
                                show: true, showAlways: true, label: 'INGRESOS BRUTOS', color: '#71717A', fontSize: '9px', fontWeight: 800,
                                formatter: () => `$${data.revenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                            }
                        }
                    }
                }
            }
        };
        return { chartOptions: options, chartSeries: series };
    }, [data]);

    if (isLoading || !data) {
        return (
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 h-[400px] animate-pulse flex flex-col justify-between">
                <div className="h-4 w-1/3 bg-zinc-800/50 rounded" />
                <div className="h-32 w-32 rounded-full bg-zinc-800/50 mx-auto mt-4" />
                <div className="h-2 w-full bg-zinc-800/50 rounded mt-4" />
            </div>
        );
    }

    const isNegative = data.netProfit < 0;
    const isRisk = data.revenue > 0 && data.operatingExpenses > data.revenue * 0.7;

    // Data-driven UI para las métricas inferiores
    const bottomMetrics = [
        { id: 'profit', label: 'Utilidad', value: data.netProfit, icon: ArrowUpRight, colorClass: 'text-emerald-500', borderClass: 'border-emerald-500/10' },
        { id: 'expenses', label: 'Gastos', value: data.operatingExpenses, icon: ArrowDownRight, colorClass: 'text-red-400', borderClass: 'border-red-500/10' },
        { id: 'waste', label: 'Mermas', value: data.waste, icon: ArrowDownRight, colorClass: 'text-amber-400', borderClass: 'border-amber-500/10' },
        ...(data.heldDeposits > 0 ? [{ id: 'deposits', label: 'Pasivo (Depósito)', value: data.heldDeposits, icon: Lock, colorClass: 'text-cyan-400', borderClass: 'border-cyan-500/20 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]' }] : [])
    ];

    return (
        <div className={`relative overflow-hidden bg-zinc-900/40 border ${isRisk ? 'border-amber-500/30' : 'border-zinc-800/80'} rounded-2xl p-6 group transition-all duration-300 hover:bg-zinc-900/60`}>

            {/* Ambient Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 pointer-events-none ${isNegative ? 'bg-red-500/5 group-hover:bg-red-500/10' : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'}`} />

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity size={14} className={isRisk ? 'text-amber-500' : 'text-zinc-500'} />
                    Pulso Financiero
                </h3>
                {isRisk && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                    >
                        <AlertTriangle size={10} /> Riesgo
                    </motion.span>
                )}
            </header>

            {/* Main Metric */}
            <div className="mb-4 flex justify-between items-end relative z-10">
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Utilidad Neta Libre</p>
                    <h2 className={`text-3xl font-black font-mono tracking-tight ${isNegative ? 'text-red-500' : 'text-emerald-400'}`}>
                        ${data.netProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className={`p-2.5 rounded-xl border ${isNegative ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                    {isNegative ? <TrendingDown size={24} /> : <TrendingUp size={24} />}
                </div>
            </div>

            {/* Chart Container */}
            <div className="relative z-10 flex justify-center items-center h-[200px] -mt-2 mb-2">
                {data.revenue === 0 ? (
                    <div className="text-zinc-600 text-xs uppercase font-bold tracking-widest text-center">
                        No hay ingresos registrados hoy
                    </div>
                ) : (
                    <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={240} />
                )}
            </div>

            {/* Staggered Metrics Grid */}
            <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className={`grid gap-2 relative z-10 ${data.heldDeposits > 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}
            >
                {bottomMetrics.map((metric) => (
                    <motion.div
                        key={metric.id}
                        // variants={cardVariants}
                        className={`bg-zinc-950/50 rounded-lg p-2 border ${metric.borderClass}`}
                    >
                        <div className={`flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider mb-1 ${metric.colorClass}`}>
                            <metric.icon size={10} /> {metric.label}
                        </div>
                        <div className="text-xs font-mono font-bold text-zinc-300">
                            ${metric.value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    );
}