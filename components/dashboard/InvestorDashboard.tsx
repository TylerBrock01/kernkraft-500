'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/axios/axios';
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { AssetTreemap } from "@/components/dashboard/AssetTreemap";
import { LiquidityDonut } from "@/components/dashboard/LiquidityDonut";
import { CustomerLtvTable } from "@/components/dashboard/CustomerLtvTable";
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function InvestorDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvestorData = () => {
        setLoading(true);
        setError(null);
        api.get('/analytics/investor')
            .then(res => {
                setData(res.data.kpis);
            })
            .catch(err => {
                console.error('Error cargando métricas de inversionista:', err);
                setError('No pudimos conectar con el motor financiero. Verifica tu conexión.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchInvestorData();
    }, []);

    // 🛡️ ESTADO DE ERROR (Gloom Style)
    if (error) {
        return (
            <div className="w-full p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <AlertCircle className="text-red-500/80" size={32} />
                <p className="text-sm font-bold text-zinc-400">{error}</p>
                <button
                    onClick={fetchInvestorData}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                >
                    <RefreshCcw size={14} /> Reintentar
                </button>
            </div>
        );
    }

    // ⏳ ESTADO DE CARGA PREMIUM (Skeleton Loader)
    if (loading || !data) {
        return (
            <div className="w-full space-y-6 animate-pulse">
                {/* Skeleton KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-zinc-900/40 border border-zinc-800/50 h-[120px] rounded-2xl"></div>
                    ))}
                </div>
                {/* Skeleton Treemap & Donut */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/50 h-[400px] rounded-2xl"></div>
                    <div className="bg-zinc-900/40 border border-zinc-800/50 h-[400px] rounded-2xl"></div>
                </div>
                {/* Skeleton Table */}
                <div className="bg-zinc-900/40 border border-zinc-800/50 h-[200px] rounded-2xl"></div>
            </div>
        );
    }

    // 🚀 RENDERIZADO PRINCIPAL (Sin bg-black ni min-h-screen, fluye con el padre)
    return (
        <div className="w-full space-y-6">
            <KpiGrid
                growth={data.growthMoM}
                health={data.financialHealth}
                loyalty={data.customerInsights.loyaltyPercentage}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AssetTreemap assets={data.assetPerformance} />
                </div>
                <LiquidityDonut cash={data.cashFlowHealth} />
            </div>

            <CustomerLtvTable customers={data.customerInsights.topClients} />
        </div>
    );
}