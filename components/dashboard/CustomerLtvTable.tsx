import { Crown, Star } from 'lucide-react';

export const CustomerLtvTable = ({ customers }: { customers: any[] }) => {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Crown size={14} className="text-amber-500" />
                Top Clientes (Lifetime Value)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {customers.map((client: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-xl hover:border-zinc-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500">
                                {i === 0 ? <Crown size={18} /> : <Star size={18} className={i === 1 ? 'text-zinc-400' : 'text-amber-700'} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-zinc-200">{client.name}</p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{client.transactionCount} Tickets</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-mono font-bold text-emerald-400">
                                ${client.totalSpent.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {customers.length === 0 && (
                <div className="text-center py-6 text-zinc-600 text-xs uppercase tracking-widest font-bold">
                    No hay suficientes datos de clientes
                </div>
            )}
        </div>
    );
};