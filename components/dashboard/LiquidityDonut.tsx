import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// 🛡️ IMPORTACIÓN DINÁMICA: Vital para que Next.js no colapse al renderizar gráficos en el servidor
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const LiquidityDonut = ({ cash }: { cash: any }) => {
    const series = [cash.freeCapitalAllTime, cash.retainedCapital];

    const options: ApexOptions = {
        chart: { type: 'donut', background: 'transparent' },
        colors: ['#10B981', '#06B6D4'], // Esmeralda (Libre) y Cian (Retenido)
        labels: ['Capital Libre', 'Depósitos'],
        stroke: { show: true, colors: ['#09090b'], width: 2 }, // Borde Gloom (Zinc-950)
        legend: { position: 'bottom', labels: { colors: '#71717a' } },
        tooltip: {
            theme: 'dark',
            y: { formatter: (val) => `$${val.toLocaleString('es-MX', { minimumFractionDigits: 2 })}` }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: { color: '#71717a' },
                        value: {
                            color: '#F4F4F5',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            formatter: (val) => `$${Number(val).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                        },
                        total: {
                            show: true,
                            label: 'EN BANCO',
                            color: '#a1a1aa',
                            fontWeight: 'bold',
                            // 🧠 Usamos el physicalCashInBusiness que calculamos en el backend
                            formatter: () => `$${cash.physicalCashInBusiness.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                        }
                    }
                }
            }
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl h-full flex flex-col justify-between">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Liquidez Real</h3>

            {/* Contenedor flexible para que el gráfico no se aplaste */}
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
                <ReactApexChart options={options} series={series} type="donut" width="100%" height="100%" />
            </div>

            <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[10px] text-cyan-500 font-bold">
                🔒 Bloqueado: ${cash.retainedCapital.toLocaleString('es-MX', { minimumFractionDigits: 2 })} en depósitos activos.
            </div>
        </div>
    );
};