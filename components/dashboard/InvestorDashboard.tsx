'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/axios/axios';
import {
    TrendingUp, TrendingDown, Wallet, Users,
    Package, AlertCircle, CheckCircle2, ChevronRight
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function InvestorDashboard() {
    const [metrics, setMetrics] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await api.get('/analytics/investor');
                setMetrics(response.data.kpis);
            } catch (error) {
                console.error('Error cargando métricas de inversionista:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    if (isLoading || !metrics) return <div className="p-10 text-zinc-500 animate-pulse">Analizando mercados...</div>;

    const { growthMoM, assetPerformance, customerInsights, cashFlowHealth, financialHealth } = metrics;

    // 📊 CONFIGURACIÓN DE LIQUIDEZ (Donut)
    const liquiditySeries = [cashFlowHealth.freeCapitalAllTime, cashFlowHealth.retainedCapital];
    const liquidityOptions: ApexOptions = {
        chart: { type: 'donut' },
        labels: ['Capital Libre', 'Depósitos Retenidos'],
        colors: ['#10B981', '#06B6D4'], // Esmeralda y Cian
        stroke: { show: false },
        legend: { position: 'bottom', labels: { colors: '#A1A1AA' } },
        plotOptions: {
            pie: {
                donut: {
                    size: '80%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Caja Total',
                            color: '#71717A',
                            formatter: () => `$${(cashFlowHealth.physicalCashInBusiness / 1000).toFixed(1)}k`
                        }
                    }
                }
            }
        }
    };

    // 🟩 CONFIGURACIÓN DEL TREEMAP (Rendimiento de Activos)
    const treemapSeries = [
        {
            data: assetPerformance.map((asset: any) => ({
                x: asset.product,
                y: asset.financials.netRevenue
            }))
        }
    ];

    const treemapOptions: ApexOptions = {
        chart: {
            type: 'treemap',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true, speed: 800 }
        },
        theme: { mode: 'dark' },
        colors: ['#10B981'], // Esmeralda base
        stroke: {
            show: true,
            width: 3,
            colors: ['#18181B'] // Color Zinc-950 para los bordes de los bloques
        },
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.6, // Hace que los bloques de menor venta se vean más oscuros
                reverseNegativeShade: true
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 700,
                colors: ['#F4F4F5'] // Texto claro
            },
            // Formateamos para que muestre "Nombre del Producto \n $15,000"
            formatter: function (text, op) {
                return [text, `$${op.value.toLocaleString('es-MX')}`];
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (value) => `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* 1. TOP SCORECARDS (MoM Growth & Net Profit) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Crecimiento {growthMoM.currentMonth.label}</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-3xl font-black text-zinc-100">${growthMoM.currentMonth.revenue.toLocaleString()}</h2>
                        <span className={`flex items-center gap-1 text-xs font-bold ${growthMoM.growth.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {growthMoM.growth.isPositive ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                            {growthMoM.growth.percentage}%
                        </span>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Margen de Utilidad</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-3xl font-black text-zinc-100">{financialHealth.netProfit.marginPercentage.toFixed(1)}%</h2>
                        <CheckCircle2 size={20} className="text-emerald-500/50" />
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Lealtad del Cliente</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-3xl font-black text-zinc-100">{customerInsights.loyaltyPercentage}%</h2>
                        <Users size={20} className="text-cyan-500/50" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. RENDIMIENTO DE ACTIVOS (Treemap) */}
                <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                                <Package size={16} className="text-emerald-500" />
                                Mapa de Ingresos por Activo (Top 5)
                            </h3>
                            <p className="text-[10px] text-zinc-500 mt-1">El tamaño del bloque representa la utilidad neta generada.</p>
                        </div>
                    </div>

                    {/* Contenedor dinámico del gráfico */}
                    <div className="flex-1 w-full relative min-h-[250px] mt-2">
                        <ReactApexChart
                            options={treemapOptions}
                            series={treemapSeries}
                            type="treemap"
                            height="100%"
                            width="100%"
                        />
                    </div>
                </div>
                {/* 3. SALUD DE FLUJO (Liquidity) */}
                {/*<div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col">*/}
                {/*    <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-6">*/}
                {/*        <Wallet size={16} className="text-cyan-500" />*/}
                {/*        Distribución de Liquidez*/}
                {/*    </h3>*/}
                {/*    <div className="flex-1 flex items-center justify-center">*/}
                {/*        <ReactApexChart options={liquidityOptions} series={liquiditySeries} type="donut" width="100%" />*/}
                {/*    </div>*/}
                {/*    <div className="mt-4 p-3 bg-zinc-950/50 rounded-xl border border-zinc-800">*/}
                {/*        <p className="text-[9px] text-zinc-500 uppercase font-black mb-1">Nota del Auditor</p>*/}
                {/*        <p className="text-[10px] text-zinc-400 leading-relaxed">*/}
                {/*            Tienes <span className="text-cyan-400 font-bold">${cashFlowHealth.retainedCapital.toLocaleString()}</span> en depósitos que no pertenecen a la utilidad neta.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}