'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp, AlertCircle, RefreshCcw } from 'lucide-react';
import { api } from '@/app/lib/axios/axios';
import { ApexOptions } from 'apexcharts';

// 🛡️ IMPORTACIÓN DINÁMICA
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function VolatilityChart({ timeframe }: { timeframe: string }) {
    const [series, setSeries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOHLC = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`/analytics/ohlc?period=${timeframe}`);
            const rawData = response.data.data;

            const candleData = rawData.map((item: any) => ({
                x: item.date,
                y: [item.open, item.high, item.low, item.close]
            }));

            const volumeData = rawData.map((item: any) => ({
                x: item.date,
                y: item.volume
            }));

            setSeries([
                { name: 'Precio ($)', type: 'candlestick', data: candleData },
                { name: 'Tráfico (Tickets)', type: 'bar', data: volumeData }
            ]);
        } catch (err) {
            console.error('Error cargando las velas:', err);
            setError('Fallo al cargar la acción del precio.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOHLC();
    }, [timeframe]);

    // 🎨 ESTÉTICA GLOOM Y CONFIGURACIÓN MIXTA
    const chartOptions: ApexOptions = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true, speed: 500 }
        },
        theme: { mode: 'dark' },
        stroke: {
            width: [2, 0] // Las velas usan el color de fill, la barra no tiene borde
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#10B981',   // Emerald 500
                    downward: '#F43F5E'  // Rose 500
                },
                wick: { useFillColor: true }
            },
            bar: {
                columnWidth: '20%', // 👈 FIX: Barras más delgadas y estéticas
                borderRadius: 2
            }
        },
        // Colores: [Velas (ignorado por plotOptions), Volumen (Zinc 800/900 con opacidad)]
        colors: ['#10B981', '#3F3F46'],
        xaxis: {
            type: 'datetime',
            labels: {
                style: { colors: '#71717A', fontFamily: 'monospace' },
                // 👈 FIX: Formato dinámico. Si es 'daily' muestra horas, si no, días.
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false } // Quitamos el tooltip feo del eje X
        },
        yaxis: [
            {
                // 📈 EJE Y IZQUIERDO (VELAS / DINERO)
                seriesName: 'Precio ($)',
                labels: {
                    style: { colors: '#71717A', fontFamily: 'monospace', fontWeight: 'bold' },
                    formatter: (value) => `$${value.toLocaleString('es-MX', { maximumFractionDigits: 0 })}`
                },
                tooltip: { enabled: true }
            },
            {
                // 📊 EJE Y DERECHO (VOLUMEN / TRÁFICO)
                seriesName: 'Tráfico (Tickets)',
                opposite: true,
                // 👈 FIX MAGISTRAL: Engañamos a ApexCharts forzando el máximo del eje Y al 400%
                // Esto empuja las barras de volumen hacia abajo, ocupando solo el 25% inferior del gráfico.
                max: (max) => max * 4,
                labels: {
                    style: { colors: '#52525B', fontSize: '10px' },
                    formatter: (value) => `${value.toFixed(0)} tx`
                }
            }
        ],
        grid: {
            borderColor: '#27272A',
            strokeDashArray: 3,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } },
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            x: { format: timeframe === 'daily' ? 'dd MMM HH:mm' : 'dd MMM yyyy' }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            labels: { colors: '#A1A1AA' },
        }
    };

    return (
        <div className="hidden md:flex bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/60 flex-col h-full">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    Acción de Precio y Volumen
                </h3>
            </div>

            {/* ZONA DE DIBUJO (Con estados manejados correctamente) */}
            <div className="flex-1 relative flex flex-col justify-center min-h-[300px]">

                {/* 🛡️ ESTADO DE CARGA (Skeleton) */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col justify-end space-y-4 animate-pulse pt-8">
                        <div className="w-full flex items-end justify-between gap-2 h-full opacity-20">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-full bg-zinc-700 rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 🛡️ ESTADO DE ERROR */}
                {!isLoading && error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-3 bg-zinc-900/80 rounded-xl z-10">
                        <AlertCircle className="text-red-500" size={24} />
                        <p className="text-xs text-zinc-400 font-bold">{error}</p>
                        <button onClick={fetchOHLC} className="text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded-md">
                            <RefreshCcw size={12} /> Reintentar
                        </button>
                    </div>
                )}

                {/* 🛡️ ESTADO VACÍO */}
                {!isLoading && !error && series.length > 0 && series[0].data.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xs font-mono uppercase tracking-widest z-10">
                        Aún no hay operaciones registradas
                    </div>
                )}

                {/* 📊 GRÁFICO REAL */}
                {!isLoading && !error && series.length > 0 && series[0].data.length > 0 && (
                    <div className="w-full h-full -ml-2">
                        <ReactApexChart
                            options={chartOptions}
                            series={series}
                            type="line"
                            height="100%"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}