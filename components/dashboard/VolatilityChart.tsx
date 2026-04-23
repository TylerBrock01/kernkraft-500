'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, TrendingUp } from 'lucide-react';
import { api } from '@/app/lib/axios/axios';
import { ApexOptions } from 'apexcharts';

// 🛡️ IMPORTACIÓN DINÁMICA
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function VolatilityChart({ timeframe }: { timeframe: string }) {
    // 🧠 TIPADO AJUSTADO: Usamos any[] porque ApexCharts usa un tipado complejo para gráficos mixtos
    const [series, setSeries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOHLC = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/analytics/ohlc?period=${timeframe}`);
                const rawData = response.data.data;

                // 📊 1. DATA DE VELAS (El Dinero)
                const candleData = rawData.map((item: any) => ({
                    x: item.date,
                    y: [item.open, item.high, item.low, item.close]
                }));

                // 📊 2. DATA DE VOLUMEN (El Tráfico de Clientes)
                const volumeData = rawData.map((item: any) => ({
                    x: item.date,
                    y: item.volume
                }));

                // 🚀 INYECTAMOS AMBAS SERIES
                setSeries([
                    {
                        name: 'Volatilidad (Precio)',
                        type: 'candlestick',
                        data: candleData
                    },
                    {
                        name: 'Volumen (Tickets)',
                        type: 'bar', // Gráfico de barras superpuesto
                        data: volumeData
                    }
                ]);
            } catch (error) {
                console.error('Error cargando las velas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOHLC();
    }, [timeframe]);

    // 🎨 ESTÉTICA GLOOM Y CONFIGURACIÓN MIXTA
    const chartOptions: ApexOptions = {
        chart: {
            // Para gráficos mixtos, la base debe ser 'line'
            type: 'line',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true }
        },
        theme: { mode: 'dark' },
        stroke: {
            // Ancho de línea: 1px para la vela (si aplica), 0px para la barra (para que se vea plana)
            width: [1, 0]
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
                columnWidth: '30%', // Barras de volumen delgadas y elegantes
            }
        },
        // Sincronizamos los colores de las series: [Velas (se sobreescribe con plotOptions), Volumen (Zinc 800)]
        colors: ['#10B981', '#27272A'],
        xaxis: {
            type: 'datetime',
            labels: { style: { colors: '#71717A' } },
            axisBorder: { color: '#27272A' },
            axisTicks: { color: '#27272A' }
        },
        // ⚖️ EL SECRETO: DOBLE EJE Y
        yaxis: [
            {
                // Eje Y Izquierdo (Para las Velas / Dinero)
                seriesName: 'Volatilidad (Precio)',
                labels: {
                    style: { colors: '#71717A' },
                    formatter: (value) => `$${value.toFixed(2)}`
                },
                tooltip: { enabled: true }
            },
            {
                // Eje Y Derecho (Para el Volumen / Tráfico)
                seriesName: 'Volumen (Tickets)',
                opposite: true, // Lo manda al lado derecho
                labels: {
                    style: { colors: '#52525B' }, // Un gris más oscuro para que no robe atención
                    formatter: (value) => `${value.toFixed(0)} tx`
                }
            }
        ],
        grid: {
            borderColor: '#27272A',
            strokeDashArray: 4
        },
        tooltip: {
            theme: 'dark',
            shared: true, // 👈 Importante: Muestra ambas métricas al pasar el mouse
            custom: undefined // Dejamos que ApexCharts arme el tooltip compartido
        },
        legend: {
            show: true,
            position: 'top',
            labels: { colors: '#A1A1AA' }
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/60">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-500" />
                        Acción de Precio y Volumen
                    </h3>
                </div>
            </div>

            {/* ZONA DE DIBUJO */}
            <div className="min-h-[300px] relative flex items-center justify-center">
                {isLoading ? (
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                ) : series.length > 0 && series[0].data.length > 0 ? (
                    <div className="w-full mt-4">
                        <ReactApexChart
                            options={chartOptions}
                            series={series}
                            // Aunque la base sea line, le decimos al componente react que maneje series mixtas
                            type="line"
                            height={320}
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