'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, TrendingUp } from 'lucide-react';
import { api } from '@/app/lib/axios/axios';
import { ApexOptions } from 'apexcharts'; // Tipado estricto

// 🛡️ IMPORTACIÓN DINÁMICA
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function VolatilityChart({ timeframe }: { timeframe: string }) {
    const [series, setSeries] = useState<{ name: string; data: { x: string; y: number[] }[] }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOHLC = async () => {
            setIsLoading(true);
            try {
                // 🔗 Conectamos con el endpoint unificado de NestJS
                const response = await api.get(`/analytics/ohlc?period=${timeframe}`);
                const rawData = response.data.data;

                const formattedData = rawData.map((item: any) => ({
                    x: item.date,
                    y: [item.open, item.high, item.low, item.close]
                }));

                setSeries([{
                    name: 'Volatilidad del Ticket',
                    data: formattedData
                }]);
            } catch (error) {
                console.error('Error cargando las velas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOHLC();
    }, [timeframe]); // 👈 Re-ejecuta cuando el usuario cambia de pestaña

    // 🎨 ESTÉTICA GLOOM
    const chartOptions: ApexOptions = {
        chart: {
            type: 'candlestick',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true }
        },
        theme: { mode: 'dark' },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#10B981',   // Emerald 500
                    downward: '#F43F5E'  // Rose 500
                },
                wick: { useFillColor: true }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: { style: { colors: '#71717A' } },
            axisBorder: { color: '#27272A' },
            axisTicks: { color: '#27272A' }
        },
        yaxis: {
            tooltip: { enabled: true },
            labels: {
                style: { colors: '#71717A' },
                formatter: (value) => `$${value.toFixed(2)}`
            }
        },
        grid: {
            borderColor: '#27272A',
            strokeDashArray: 4
        },
        tooltip: {
            theme: 'dark',
            y: { formatter: (value) => `$${value.toFixed(2)}` }
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/60">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-500" />
                        Fluctuación de Tickets
                    </h3>
                </div>
            </div>

            {/* ZONA DE DIBUJO */}
            <div className="min-h-[300px] relative flex items-center justify-center">
                {isLoading ? (
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                ) : series.length > 0 && series[0].data.length > 0 ? (
                    <div className="w-full">
                        <ReactApexChart
                            options={chartOptions}
                            series={series}
                            type="candlestick"
                            height={300}
                        />
                    </div>
                ) : (
                    <div className="text-zinc-600 text-xs uppercase font-bold tracking-widest text-center">
                        No hay datos suficientes para generar velas
                    </div>
                )}
            </div>
        </div>
    );
}