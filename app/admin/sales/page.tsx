// app/admin/sales/page.tsx
import { cookies } from 'next/headers';
import { format } from "date-fns";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import { getSalesByDate } from "@/src/api";
import { Terminal, CalendarDays } from "lucide-react";

export default async function SalesPage() {
    const queryClient = new QueryClient();
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    const cookieStore = await cookies();
    const token = cookieStore.get('skate_token')?.value;

    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate, token)
    });

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Cabecera de Reporte */}
            <div className="relative border-l-4 border-yellow-400 pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                    <Terminal className="w-5 h-5 text-yellow-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                        Admin_Module / Financial_Logs
                    </span>
                </div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                    Sales_<span className="text-yellow-400">Ledger</span>
                </h1>
                <p className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest max-w-xl leading-relaxed">
                    Extrayendo telemetría de transacciones desde Render_DB.
                    Filtra por fecha para auditar el flujo de caja de VASK8.
                </p>
            </div>

            {/* Panel de Filtros con Estética de Consola */}
            <div className="bg-zinc-900/40 border border-white/5 p-8 relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <CalendarDays className="w-24 h-24 text-white" />
                </div>

                <div className="relative z-10">
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <TransactionFilter />
                    </HydrationBoundary>
                </div>
            </div>
        </div>
    );
}