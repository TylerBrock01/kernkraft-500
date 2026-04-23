import { TrendingUp, TrendingDown, CheckCircle2, Users, Target } from 'lucide-react';

interface KpiGridProps {
    growth: any;
    health: any;
    loyalty: number;
}

export const KpiGrid = ({ growth, health, loyalty }: KpiGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* 1. CRECIMIENTO MoM */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl transition-colors hover:bg-zinc-900/60">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Target size={12} className="text-zinc-400" />
                    Ingresos ({growth.currentMonth.label})
                </p>
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-black text-zinc-100 font-mono">
                        ${growth.currentMonth.revenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </h2>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${growth.growth.isPositive ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                        {growth.growth.isPositive ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                        {growth.growth.percentage}%
                    </span>
                </div>
            </div>

            {/* 2. SALUD Y MARGEN NETO */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl transition-colors hover:bg-zinc-900/60">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    Margen de Utilidad Real
                </p>
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-emerald-400 font-mono">
                            {health.netProfit.marginPercentage.toFixed(1)}%
                        </h2>
                        <p className="text-xs text-zinc-500 font-bold mt-1">
                            Ganancia: ${health.netProfit.amount.toLocaleString('es-MX')}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. LEALTAD DEL CLIENTE */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl transition-colors hover:bg-zinc-900/60">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Users size={12} className="text-cyan-500" />
                    Lealtad (LTV Base)
                </p>
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-black text-zinc-100 font-mono">
                        {loyalty}%
                    </h2>
                    <p className="text-xs text-zinc-500 font-bold max-w-[100px] text-right">
                        Ventas de clientes registrados
                    </p>
                </div>
            </div>

        </div>
    );
};