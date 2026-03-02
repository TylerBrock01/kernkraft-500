// components/transactions/TransactionFilter.tsx
"use client"

import Calendar from "react-calendar";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "@/components/transactions/TransactionSummary";
import { formatCurrency } from "@/src/utils";
import { Search, Zap, FileText } from "lucide-react";

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
    const [date, setDate] = useState<Value>(new Date())
    const formattedDate = format(date!.toString(), "yyyy-MM-dd")

    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    const transactions = data?.transactions ?? []
    const totalVentas = transactions.reduce((acc, transaction) => acc + +transaction.total, 0)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 relative items-start">

            {/* SECCIÓN CALENDARIO: El Selector Táctico */}
            <div className="lg:sticky lg:top-28 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                    <Search className="w-4 h-4 text-yellow-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Select_Target_Date</span>
                </div>

                <div className="vask8-calendar-container p-4 bg-zinc-950 border border-white/5 rounded-sm shadow-2xl">
                    <Calendar
                        locale="es-ES"
                        value={date}
                        onChange={setDate}
                        className="vask8-custom-calendar"
                    />
                </div>
            </div>

            {/* SECCIÓN RESULTADOS: El Ledger Inyectado */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-500" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white italic">
                            Report: {formattedDate}
                        </h3>
                    </div>
                    {transactions.length > 0 && (
                        <span className="text-[10px] font-mono bg-yellow-400 text-black px-2 py-0.5 font-bold">
                            {transactions.length} TRANS_DETECTED
                        </span>
                    )}
                </div>

                <div className="min-h-[300px] space-y-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                            <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Sincronizando...</p>
                        </div>
                    ) : transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <TransactionSummary
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))
                    ) : (
                        <div className="border border-dashed border-white/10 p-10 text-center">
                            <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">
                                [ No hay registros de actividad para esta fecha ]
                            </p>
                        </div>
                    )}
                </div>

                {/* RESUMEN FINANCIERO */}
                <div className="mt-10 pt-6 border-t-2 border-white/5 flex flex-col items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                        Daily_Net_Revenue
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black italic uppercase text-yellow-400 tracking-tighter">
                            {formatCurrency(totalVentas)}
                        </span>
                        <span className="text-xs font-mono text-zinc-600">MXN</span>
                    </div>
                </div>
            </div>
        </div>
    )
}