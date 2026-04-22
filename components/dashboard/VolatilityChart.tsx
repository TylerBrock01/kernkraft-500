'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, TrendingUp } from 'lucide-react';
import { api } from '@/app/lib/axios/axios'; // Ajusta la ruta a tu Axios

// 🛡️ IMPORTACIÓN DINÁMICA: Evita el crasheo de Next.js en el servidor
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function VolatilityChart() {
    const [series, setSeries] = useState<{ name: string; data: any[] }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOHLC = async () => {
            try {
                // Hacemos la petición a tu nuevo endpoint
                const response = await api.get('/analytics/ohlc/daily');
                const rawData = response.data.data;

                // 🧠 MAPEO FINANCIERO: ApexCharts pide exactamente este formato:
                // x: Fecha, y: [Open, High, Low, Close]
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
    }, []);

    // 🎨 ESTÉTICA GLOOM: Configuramos el motor gráfico
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
            background: 'transparent',
            toolbar: {
                show: true,
                tools: { download: false, pan: true, zoom: true }
            },
            animations: { enabled: true }
        },
        theme: { mode: 'dark' },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#10B981',   // Emerald 500 (Cierre > Apertura)
                    downward: '#F43F5E'  // Rose 500 (Cierre < Apertura)
                },
                wick: { useFillColor: true } // El pabilo usa el mismo color que la vela
            }
        },
        xaxis: {
            type: 'datetime',
            labels: { style: { colors: '#71717A' } }, // Zinc 500
            axisBorder: { color: '#27272A' },         // Zinc 800
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
            borderColor: '#27272A', // Rejilla sutil Gloom
            strokeDashArray: 4      // Líneas punteadas elegantes
        },
        tooltip: {
            theme: 'dark',
            y: { formatter: (value) => `$${value.toFixed(2)}` }
        }
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl">
            {/* HEADER DEL WIDGET */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-zinc-100 font-bold text-lg flex items-center gap-2">
                        <TrendingUp className="text-emerald-500" size={20} />
                        Fluctuación Diaria de Tickets
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1">
                        Análisis OHLC: Identifica los picos máximos y mínimos de gasto por cliente.
                    </p>
                </div>
            </div>

            {/* ZONA DE DIBUJO */}
            <div className="min-h-[350px] relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                    </div>
                ) : series[0]?.data.length > 0 ? (
                    <ReactApexChart
                        options={chartOptions}
                        series={series}
                        type="candlestick"
                        height={350}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                        No hay transacciones registradas este mes.
                    </div>
                )}
            </div>
        </div>
    );
}