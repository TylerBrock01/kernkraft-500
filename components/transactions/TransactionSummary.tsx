// components/transactions/TransactionSummary.tsx
import { Transaction } from "@/src/schema";
import Image from "next/image";
import { formatCurrency, getImagePath } from "@/src/utils";
import { Package, User, Tag, ArrowRight } from "lucide-react";

export default function TransactionSummary({ transaction }: { transaction: Transaction }) {
    return (
        <div className="mb-10 bg-zinc-900/30 border border-white/5 overflow-hidden group hover:border-white/10 transition-colors">
            {/* Header de la Transacción: Look de Terminal */}
            <div className="flex items-center justify-between bg-zinc-900 p-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-yellow-400 text-black px-2 py-0.5 -skew-x-12">
                        TX_ID
                    </span>
                    <p className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-tighter">
                        {transaction.id}
                    </p>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                    <User className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest italic">
                        Ops: {transaction.user.name}
                    </span>
                </div>
            </div>

            {/* Lista de Hardware (Productos) */}
            <ul role="list" className="divide-y divide-white/5 bg-black/20">
                {transaction.contents.map((item) => (
                    <li className="p-4" key={item.id}>
                        <div className="flex items-center gap-6">
                            <div className="relative w-20 h-20 bg-zinc-950 border border-white/5 flex-shrink-0 group-hover:border-yellow-400/30 transition-colors">
                                <Image
                                    src={getImagePath(item.product.image)}
                                    alt={item.product.name}
                                    className="object-contain p-2"
                                    fill
                                    unoptimized={true}
                                />
                            </div>

                            <div className="flex-auto min-w-0">
                                <h3 className="text-xs font-black uppercase italic text-white truncate tracking-tight">
                                    {item.product.name}
                                </h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <p className="text-[10px] text-zinc-500 font-mono">
                                        QTY: <span className="text-zinc-300">{item.quantity}</span>
                                    </p>
                                    <p className="text-[10px] text-zinc-500 font-mono">
                                        UNIT: <span className="text-zinc-300">{formatCurrency(+item.price)}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-black text-white italic">
                                    {formatCurrency(+item.price * item.quantity)}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Desglose Financiero */}
            <div className="p-5 bg-zinc-950/50 space-y-3">
                {transaction.coupon && (
                    <div className="flex flex-col gap-2 pb-3 border-b border-white/5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <Tag className="w-3 h-3 text-yellow-400" />
                                <dt className="text-[10px] font-bold uppercase tracking-widest">Cupón Aplicado</dt>
                            </div>
                            <dd className="text-xs font-black text-yellow-400 italic uppercase">{transaction.coupon}</dd>
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono">
                            <dt className="text-zinc-500 uppercase">Ajuste de Descuento</dt>
                            <dd className="text-red-400">-{formatCurrency(+transaction.couponDiscount!)}</dd>
                        </div>
                    </div>
                )}

                {/* Total Final */}
                <div className="flex justify-between items-end pt-2">
                    <div className="flex items-center gap-2 text-zinc-600">
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Final_Settlement</span>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest -mb-1">Total MXN</p>
                        <p className="text-3xl font-black italic uppercase text-white tracking-tighter">
                            {formatCurrency(+transaction.total)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}