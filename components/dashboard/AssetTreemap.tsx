import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const AssetTreemap = ({ assets }: { assets: any[] }) => {
    const series = [{
        data: assets.map(a => ({ x: a.product, y: a.financials.netRevenue }))
    }];

    const options: any = {
        legend: { show: false },
        chart: { type: 'treemap', background: 'transparent', toolbar: { show: false } },
        colors: ['#10B981'],
        plotOptions: { treemap: { enableShades: true, shadeIntensity: 0.5 } },
        stroke: { show: true, width: 2, colors: ['#09090b'] },
        dataLabels: {
            enabled: true,
            style: { fontSize: '12px', fontWeight: 'bold' },
            formatter: (text: string, op: any) => [text, `$${op.value.toLocaleString()}`]
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl h-full">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Dominancia de Activos</h3>
            <ReactApexChart options={options} series={series} type="treemap" height={350} />
        </div>
    );
};