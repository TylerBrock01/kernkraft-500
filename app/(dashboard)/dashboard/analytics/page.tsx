'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import {Activity, TrendingUp} from "lucide-react";
import FinancialPulseCard from "@/components/dashboard/FinancialPulseCard";
import HeaderDashboard from "@/app/(dashboard)/dashboard/analytics/HeaderDashboard";

// Utilidad para formatear dinero
const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export default function AnalyticsDashboardPage() {
    const [weekly, setWeekly] = useState<any>(null);
    const [revenue, setRevenue] = useState<number | null>(null);
    const [investor, setInvestor] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true);
            try {
                // ⚠️ Asegúrate de que tu controlador en NestJS tenga el prefijo 'analytics' (ej. @Controller('analytics'))
                const [weeklyRes, investorRes] = await Promise.all([
                    api.get('/analytics/weekly-snapshot'),
                    api.get('/analytics/investor')
                ]);

                setWeekly(weeklyRes.data);
                setInvestor(investorRes.data);
            } catch (error) {
                toast.error('Error al desencriptar las métricas financieras');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, []);
    useEffect(() => {
        const fetchDailyRevenue = async () => {
            try {
                const { data } = await api.get('/analytics/daily-revenue');
                setRevenue(data.revenue);
            } catch (error) {
                console.error('Error cargando ingresos del día:', error);
                setRevenue(0); // Fallback seguro
            } finally {
                setIsLoading(false);
            }
        };

        fetchDailyRevenue();

        // Opcional: Recargar cada 5 minutos automáticamente para que el dueño vea el dinero subir
        const interval = setInterval(fetchDailyRevenue, 300000);
        return () => clearInterval(interval);
    }, []);
    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center pt-20">
                <div className="w-6 h-6 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest animate-pulse">Procesando analíticas de la instancia...</p>
            </div>
        );
    }

    if (!weekly || !investor) return null;

    const { kpis } = investor;
    const growth = kpis.growthMoM.growth;
    const financial = kpis.financialHealth;

    return (
        <div className="max-w-7xl mx-auto w-full pt-4 pb-20 space-y-6">
            {/* HEADER TÁCTICO */}

            <HeaderDashboard/>
            <div className="relative overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 group transition-all duration-300 hover:bg-zinc-900/60 hover:border-zinc-700/80">

                {/* Brillo sutil de fondo (Estética Gloom) */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

                <div className="relative z-10 flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Activity size={14} className="text-emerald-500/70" />
                        Ingresos de Hoy
                    </h3>
                    {/* Etiqueta de "En Vivo" */}
                    <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          En Vivo
        </span>
                </div>

                <div>
                    {isLoading ? (
                        // Skeleton Loader
                        <div className="h-10 w-40 bg-zinc-800/50 rounded-lg animate-pulse mt-2"></div>
                    ) : (
                        <div className="flex items-end gap-3 mt-2">
                            <h2 className="text-4xl font-black font-mono text-white tracking-tight">
                                ${revenue?.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </h2>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded mb-1.5">
                                <TrendingUp size={12} />
                                <span>Corte Abierto</span>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <FinancialPulseCard/>
            {/* ================= FILA 1: KPIs GLOBALES (INVESTOR METRICS) ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Utilidad Neta (MoM) */}
                <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Utilidad Neta (Mes Actual)</p>
                    <h3 className="text-3xl font-black text-white font-mono">{formatMoney(financial.netProfit.amount)}</h3>
                    <div className="mt-4 flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest flex items-center gap-1 ${growth.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {growth.isPositive ? '↑' : '↓'} {Math.abs(growth.percentage)}%
            </span>
                        <span className="text-[9px] uppercase text-zinc-600 font-mono">vs {kpis.growthMoM.previousMonth.label}</span>
                    </div>
                </div>

                {/* Flujo de Efectivo Físico */}
                <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Liquidez Total en Caja</p>
                    <h3 className="text-3xl font-black text-white font-mono">{formatMoney(kpis.cashFlowHealth.physicalCashInBusiness)}</h3>
                    <div className="mt-4 flex items-center justify-between text-[10px] font-mono border-t border-zinc-800/50 pt-3">
                        <span className="text-zinc-400">Capital Libre: <span className="text-white">{formatMoney(kpis.cashFlowHealth.freeCapitalAllTime)}</span></span>
                    </div>
                </div>

                {/* Pasivo (Depósitos Retenidos) */}
                <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/50"></div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-blue-500/70 mb-1">Pasivo a Devolver (Depósitos)</p>
                    <h3 className="text-3xl font-black text-blue-400 font-mono">{formatMoney(kpis.cashFlowHealth.retainedCapital)}</h3>
                    <p className="text-[9px] uppercase text-zinc-600 mt-4 leading-relaxed">Capital retenido por rentas activas. No es ganancia.</p>
                </div>

                {/* Gastos Operativos */}
                <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Gastos Operativos (Mes)</p>
                    <h3 className="text-3xl font-black text-zinc-300 font-mono">{formatMoney(financial.monthlyExpenses.current)}</h3>
                    <div className="mt-4 w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                        {/* Barra visual de margen de ganancia vs gastos */}
                        <div className="bg-zinc-700 h-full" style={{ width: `${Math.min(100, (financial.monthlyExpenses.current / (financial.netProfit.amount + financial.monthlyExpenses.current || 1)) * 100)}%` }}></div>
                    </div>
                </div>

            </div>

            {/* ================= FILA 2: RADIOGRAFÍA DE 7 DÍAS & LEALTAD ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Snapshot Semanal */}
                <div className="col-span-1 lg:col-span-2 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span> Snapshot 7 Días
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-zinc-950 border border-zinc-800/50 rounded-xl">
                            <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Ingreso Bruto</p>
                            <p className="text-lg font-mono text-zinc-200">{formatMoney(weekly.financials.grossRevenue)}</p>
                        </div>
                        <div className="p-4 bg-zinc-950 border border-red-900/20 rounded-xl">
                            <p className="text-[9px] uppercase font-bold tracking-widest text-red-500/70 mb-1">Impacto Mermas</p>
                            <p className="text-lg font-mono text-red-400">-{formatMoney(weekly.financials.estimatedLoss)}</p>
                        </div>
                        <div className="p-4 bg-emerald-950/10 border border-emerald-900/20 rounded-xl">
                            <p className="text-[9px] uppercase font-bold tracking-widest text-emerald-500/70 mb-1">Ganancia Real</p>
                            <p className="text-lg font-mono text-emerald-400 font-bold">{formatMoney(weekly.financials.netProfit)}</p>
                        </div>
                    </div>

                    <div className="flex gap-6 border-t border-zinc-800/50 pt-4">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Operaciones</p>
                            <p className="text-sm font-mono text-zinc-300">{weekly.financials.transactionCount} txs</p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Ticket Promedio</p>
                            <p className="text-sm font-mono text-zinc-300">{formatMoney(Number(weekly.financials.averageTicket))}</p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-red-500/70 mb-0.5">Eventos de Pérdida</p>
                            <p className="text-sm font-mono text-red-400">{weekly.financials.lossEvents} regs</p>
                        </div>
                    </div>
                </div>

                {/* Lealtad de Clientes */}
                <div className="col-span-1 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Radar de Lealtad (LTV)</h3>

                    <div className="mb-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-2xl font-black font-mono text-zinc-200">{kpis.customerInsights.loyaltyPercentage}%</span>
                            <span className="text-[9px] uppercase tracking-widest text-zinc-500">Ingreso Identificado</span>
                        </div>
                        <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                            <div className="bg-blue-500 h-full" style={{ width: `${kpis.customerInsights.loyaltyPercentage}%` }}></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-800/50 pb-2">Top 3 Clientes Históricos</p>
                        {kpis.customerInsights.topClients.map((client: any, i: number) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-600 font-mono text-[9px]">0{i+1}</span>
                                    <p className="text-xs font-bold text-zinc-300 truncate max-w-[120px]">{client.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono text-zinc-100">{formatMoney(client.totalSpent)}</p>
                                    <p className="text-[8px] text-zinc-600 font-mono">{client.transactionCount} txs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= FILA 3: RENDIMIENTO DE ACTIVOS (ROI Y MERMAS) ================= */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Auditoría de Activos (Top 5 Histórico)</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-zinc-800/50 bg-zinc-950/30">
                            <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-zinc-500">Producto / Activo</th>
                            <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-zinc-500 text-center">Movimientos</th>
                            <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-red-500/70 text-center">Mermas</th>
                            <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-zinc-500 text-right">Ingreso Bruto</th>
                            <th className="px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-emerald-500/70 text-right">ROI Libre</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/30">
                        {kpis.assetPerformance.map((asset: any, i: number) => (
                            <tr key={i} className="hover:bg-zinc-800/10 transition-colors">
                                <td className="px-4 py-4 text-xs font-bold text-zinc-200">{asset.product}</td>
                                <td className="px-4 py-4 text-xs font-mono text-zinc-400 text-center">{asset.utilization.timesRentedOrSold}</td>
                                <td className="px-4 py-4 text-xs font-mono text-red-400/80 text-center">{asset.utilization.unitsLostToDamage > 0 ? `-${asset.utilization.unitsLostToDamage}` : '0'}</td>
                                <td className="px-4 py-4 text-xs font-mono text-zinc-300 text-right">{formatMoney(asset.financials.grossRevenue)}</td>
                                <td className="px-4 py-4 text-xs font-mono text-emerald-400 text-right font-bold">{formatMoney(asset.financials.netRevenue)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}