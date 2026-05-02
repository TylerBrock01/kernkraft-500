import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// 🛡️ Importación dinámica para SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const AssetTreemap = ({ assets }: { assets: any[] }) => {
    // 1. Estado de contingencia: ¿Qué pasa si el negocio no tiene ventas aún?
    if (!assets || assets.length === 0) {
        return (
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl h-full flex flex-col items-center justify-center min-h-[350px]">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 w-full text-left">
                    Dominancia de Activos
                </h3>
                <div className="flex-1 flex items-center justify-center text-zinc-600 text-xs font-mono uppercase tracking-widest">
                    Sin datos suficientes
                </div>
            </div>
        );
    }

    const series = [{
        data: assets.map(a => ({
            x: a.product,
            y: a.financials.netRevenue
        }))
    }];

    const options: ApexOptions = {
        chart: {
            type: 'treemap',
            background: 'transparent',
            toolbar: { show: false },
            fontFamily: 'inherit'
        },
        // El color base para el bloque que más vende
        colors: ['#10B981'],
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.65 // Un poco más de contraste entre bloques
            }
        },
        stroke: {
            show: true,
            width: 3,
            colors: ['#09090b'] // Borde oscuro tipo Gloom para separar cajas
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '13px',
                fontWeight: 800,
                fontFamily: 'monospace',
                colors: ['#FFFFFF'] // 👈 FIX 1: Forzamos el texto a blanco puro
            },
            // 👈 FIX 2: La Sombra de Texto. Garantiza 100% de legibilidad.
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 2,
                color: '#000000',
                opacity: 0.9
            },
            formatter: (text: string, op: any) => [
                text,
                `$${Number(op.value).toLocaleString('es-MX', { maximumFractionDigits: 0 })}`
            ]
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => `$${Number(val).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
            }
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl h-full flex flex-col">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                Dominancia de Activos
            </h3>
            <div className="flex-1 min-h-[300px]">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="treemap"
                    height="100%"
                />
            </div>
        </div>
    );
};