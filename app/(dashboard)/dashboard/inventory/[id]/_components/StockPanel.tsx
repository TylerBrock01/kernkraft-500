import {getStockLevel, StockLevel} from "@/app/(dashboard)/dashboard/inventory/utils/product";

const LEVELS: Record<StockLevel, { label: string; box: string; dot: string; text: string }> = {
    ok: {
        label: 'Saludable',
        box: 'border-emerald-900/30 bg-emerald-950/20',
        dot: 'bg-emerald-500',
        text: 'text-emerald-400',
    },
    low: {
        label: 'Stock bajo',
        box: 'animate-pulse border-red-900/30 bg-red-950/20',
        dot: 'bg-red-500',
        text: 'text-red-400',
    },
    out: {
        label: 'Agotado',
        box: 'animate-pulse border-red-900/30 bg-red-950/20',
        dot: 'bg-red-500',
        text: 'text-red-400',
    },
};

interface Props {
    stock: number;
    onRegisterLoss: () => void;
}

export function StockPanel({ stock, onRegisterLoss }: Props) {
    const level = LEVELS[getStockLevel(stock)];

    return (
        <div>
            <h3 className="mb-3 border-b border-zinc-800/50 pb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Estado Operativo
            </h3>

            <div className={`flex items-center gap-3 rounded-lg border p-3 ${level.box}`}>
                <div className={`h-2 w-2 rounded-full ${level.dot}`} />
                <p className="flex-1 font-mono text-sm text-zinc-300">
                    Stock actual: <span className="font-bold text-zinc-100">{stock}</span> unidades
                </p>
                <span className={`text-[10px] font-bold uppercase ${level.text}`}>{level.label}</span>
            </div>

            <div className="mt-3 text-right">
                <button
                    type="button"
                    onClick={onRegisterLoss}
                    disabled={stock <= 0}
                    className="rounded-lg border border-red-900/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                    ⚠ Registrar Merma / Pérdida
                </button>
            </div>
        </div>
    );
}