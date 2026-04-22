'use client';

import { useState } from "react";
import HeaderDashboard from "@/app/(dashboard)/dashboard/analytics/HeaderDashboard";
import FinancialPulseCard from "@/components/dashboard/FinancialPulseCard";
import VolatilityChart from "@/components/dashboard/VolatilityChart";
import TimeframeSelector, { TimeframeType } from "@/components/dashboard/TimeframeSelector";

export default function AnalyticsDashboardPage() {
    // 🧠 El "Cerebro" del tiempo sigue aquí, gobernando a todos
    const [timeframe, setTimeframe] = useState<TimeframeType>('daily');

    return (
        <div className="max-w-7xl mx-auto w-full pt-4 pb-20 space-y-6">
            <HeaderDashboard />

            {/* 🎛️ CONTROLES DE TIEMPO Y TÍTULO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                {/* El Controlador */}
                <TimeframeSelector
                    value={timeframe}
                    onChange={setTimeframe}
                />
            </div>

            {/* 📊 LAS GRÁFICAS (Sincronizadas temporalmente) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FinancialPulseCard timeframe={timeframe} />
                {/*<VolatilityChart timeframe={timeframe} />*/}
            </div>

        </div>
    )
}