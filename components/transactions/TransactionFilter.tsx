"use client"

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "@/components/transactions/TransactionSummary";
import { formatCurrency } from "@/src/utils";

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
    const [date, setDate] = useState<Value>(new Date())

    // Formateamos la fecha para la Query Key y la API
    const formattedDate = format(date!.toString(), "yyyy-MM-dd")

    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    // --- EL CAMBIO CLAVE AQUÍ ---
    // data ya no es un array, es un objeto { transactions: [], total: X, page: X }
    const transactions = data?.transactions ?? []

    // Calculamos el total de dinero sumando los 'total' de cada transacción
    const totalVentas = transactions.reduce((acc, transaction) => acc + +transaction.total, 0)

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start"}>
            <div className={"lg:sticky lg:top-10"}>
                <Calendar locale="es-ES" value={date} onChange={setDate} />
            </div>

            <div>
                {isLoading && <p className="text-2xl text-center">Cargando ventas...</p>}

                {/* Usamos 'transactions' en lugar de 'data' */}
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <TransactionSummary
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))
                ) : (
                    !isLoading && <p className={"text-center text-lg"}>No hay ventas en esta fecha</p>
                )}

                <p className={"my-5 text-lg font-bold text-right border-t pt-4"}>
                    Total del día: {''}
                    <span className={"font-normal text-indigo-600"}>
                        {formatCurrency(totalVentas)}
                    </span>
                </p>
            </div>
        </div>
    )
}