'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/app/lib/axios/axios';
import { useRouter } from 'next/navigation';

export default function TransactionsHistoryPage() {
    const router = useRouter();

    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 🎛️ FILTROS Y PAGINACIÓN
    const take = 15; // Filas por página
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);

    // Filtro de fecha (por defecto vacío para traer todas, o usa formato YYYY-MM-DD)
    const [filterDate, setFilterDate] = useState('');

    const fetchTransactions = useCallback(async (currentSkip = skip, date = filterDate) => {
        setIsLoading(true);
        try {
            // 🚀 Tu controlador pide: transactionDate, take, skip
            const params: any = { take, skip: currentSkip };
            if (date) params.transactionDate = date;

            const response = await api.get('/transactions', { params });

            // Ajusta esto dependiendo de si tu backend devuelve [data, total] o { data, total }
            // Asumiré que devuelve { transactions: [...], total: X } o similar a tus productos
            const data = response.data.transactions || response.data[0] || response.data;
            const count = response.data.total || response.data[1] || 0;

            setTransactions(Array.isArray(data) ? data : []);
            setTotal(count);
        } catch (error) {
            console.error('Error obteniendo historial:', error);
        } finally {
            setIsLoading(false);
        }
    }, [skip, filterDate]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDate(e.target.value);
        setSkip(0); // Regresamos a la página 1 al filtrar
    };

    return (
        <div className="w-full h-full flex flex-col pt-4">
            {/* 🔴 HEADER TÁCTICO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Auditoría Financiera</h1>
                    <p className="text-zinc-500 text-sm mt-1">Libro mayor de transacciones y rentas operativas</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Filtro por fecha */}
                    <div className="flex flex-col">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Filtrar por Fecha</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={handleDateChange}
                            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-emerald-500 cursor-pointer"
                        />
                    </div>
                    {filterDate && (
                        <button onClick={() => { setFilterDate(''); setSkip(0); }} className="mt-4 text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors">
                            ✕ Limpiar
                        </button>
                    )}
                </div>
            </div>

            {/* 📊 LA TABLA DE CRISTAL */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md flex flex-col flex-1 min-h-0">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Folio / Fecha</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Usuario</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Operación</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Estado</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Método</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Monto Total</th>
                            <th className="hidden lg:block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Cliente</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                        {isLoading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-zinc-500 text-sm animate-pulse">Escaneando registros...</td></tr>
                        ) : transactions.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-zinc-500 text-sm">No hay transacciones registradas en este periodo.</td></tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr
                                    key={tx.id}
                                    onClick={() => router.push(`/dashboard/transactions/${tx.id}`)} // 🚀 EL SALTO A LA AUDITORÍA QUE CREAMOS
                                    className="hover:bg-zinc-800/20 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-zinc-400 text-xs">#{tx.id}</span>
                                            <span className="text-sm font-medium text-zinc-200">
                                              {new Date(tx.transactionDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex items-center px-2 py-1 rounded text-sm border border-yellow-500/60`}>
                                        ID: {tx.userId}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex items-center py-1 rounded text-sm ${ tx.rentalStatus === "OUT"? 'text-yellow-500':tx.rentalStatus === 'RETURNED'? 'text-green-500': 'text-red-600'} `}>
                                          {tx.rentalStatus === "OUT"? 'SALIDA':tx.rentalStatus === 'RETURNED'? 'ENTRADA': null}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                                          tx.type === 'SALE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                        {tx.type}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs  font-mono ${tx.paymentMethod == 'CASH'?'text-zinc-400':' text-pink-500'}`}>
                                            {tx.paymentMethod}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-bold font-mono text-emerald-500">${Number(tx.total).toFixed(2)}</span>
                                    </td>
                                    <td className="hidden lg:block px-6 py-4 text-right">
                                        <span className={`inline-flex items-center text-sm rounded py-1 px-2 ${tx.customerId? 'border border-blue-600' : ''}`}>{ tx.customerId ? `ID:${tx.customerId}` : ''}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <span className={`text-[10px] font-bold uppercase tracking-widest border py-1 px-2 ${
                                          tx.status === 'COMPLETED' ? 'text-emerald-500' :
                                              tx.status === 'CANCELLED' ? 'text-red-500' :
                                                  'text-orange-400'
                                      }`}>
                                        {tx.status}
                                      </span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* 🎛️ CONTROLES DE PAGINACIÓN */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-950/50 shrink-0">
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                        Mostrando {transactions.length > 0 ? skip + 1 : 0} - {Math.min(skip + take, total)} de {total}
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => setSkip(Math.max(0, skip - take))} disabled={skip === 0 || isLoading} className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-all">Anterior</button>
                        <button onClick={() => setSkip(skip + take)} disabled={skip + take >= total || isLoading} className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-all">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}