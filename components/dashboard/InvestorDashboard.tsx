'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/axios/axios';
import {KpiGrid} from "@/components/dashboard/KpiGrid";
import {AssetTreemap} from "@/components/dashboard/AssetTreemap";
import {LiquidityDonut} from "@/components/dashboard/LiquidityDonut";
import {CustomerLtvTable} from "@/components/dashboard/CustomerLtvTable";

export default function InvestorDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/analytics/investor').then(res => {
            setData(res.data.kpis);
            setLoading(false);
        });
    }, []);

    if (loading || !data) return <div className="p-10 text-zinc-500 animate-pulse">Cargando Inteligencia Financiera...</div>;

    return (
        <div className="p-6 space-y-6 bg-black min-h-screen">
            {/* 1. KPIs de Cabecera (MoM y Salud Financiera) */}
            <KpiGrid
                growth={data.growthMoM}
                health={data.financialHealth}
                loyalty={data.customerInsights.loyaltyPercentage}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. El Treemap de Activos (Ocupa 2 columnas) */}
                <div className="lg:col-span-2">
                    <AssetTreemap assets={data.assetPerformance} />
                </div>

                {/* 3. El Donut de Liquidez */}
                <LiquidityDonut cash={data.cashFlowHealth} />
            </div>

            {/* 4. Tabla de Clientes VIP */}
            <CustomerLtvTable customers={data.customerInsights.topClients} />
        </div>
    );
}