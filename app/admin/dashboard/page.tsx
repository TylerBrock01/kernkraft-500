import StatCard from "@/components/admin/StatCard";
import { BarChart3, Package, DollarSign, Activity } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Cabecera Interna */}
            <div>
                <h2 className="text-sm font-black uppercase tracking-[0.5em] text-yellow-400/50 mb-2">
                    System_Status // Global_Overview
                </h2>
                <p className="text-zinc-500 text-xs font-mono">
                    Sincronizado con Render DB v.0.4.2... Latencia: Optimizada
                </p>
            </div>

            {/* Grid de Estadísticas Tácticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Ventas Totales"
                    value="$0.00"
                    icon={<DollarSign className="w-4 h-4" />}
                    color="text-green-400"
                />
                <StatCard
                    title="Gear en Stock"
                    value="16"
                    icon={<Package className="w-4 h-4" />}
                    color="text-blue-400"
                />
                <StatCard
                    title="Órdenes Hoy"
                    value="0"
                    icon={<Activity className="w-4 h-4" />}
                    color="text-yellow-400"
                />
                <StatCard
                    title="Rendimiento"
                    value="98%"
                    icon={<BarChart3 className="w-4 h-4" />}
                    color="text-purple-400"
                />
            </div>

            {/* Placeholder para Gráficas o Actividad Reciente */}
            <div className="border border-white/5 bg-zinc-950/50 p-8 rounded-sm -skew-x-2">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest text-center">
                    [ Esperando datos de telemetría de ventas... ]
                </p>
            </div>
        </div>
    );
}
