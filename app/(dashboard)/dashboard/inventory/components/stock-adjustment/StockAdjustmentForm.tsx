'use client';

import { useId, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createStockAdjustment } from '@/app/features/inventory/services/inventory.service';
import {
    STOCK_ADJUSTMENT_REASONS,
    type AdjustableProduct,
    type StockAdjustmentReason,
} from '@/app/features/inventory/types';
import { getErrorMessage } from '@/app/lib/get-error-message';

interface Props {
    product: AdjustableProduct;
    onSuccess: () => void;
    onClose: () => void;
    onBusyChange: (isBusy: boolean) => void; // para que el modal no se cierre mientras procesa
}

export function StockAdjustmentForm({ product, onSuccess, onClose, onBusyChange }: Props) {
    const uid = useId();
    // El formulario se monta cada vez que se abre el modal: no necesita reset manual
    const [quantity, setQuantity] = useState('');
    const [reason, setReason] = useState<StockAdjustmentReason>('DAMAGE');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const amount = Number(quantity);
        if (quantity.trim() === '' || !Number.isInteger(amount) || amount <= 0) {
            setError('La cantidad debe ser un entero mayor a 0.');
            return;
        }
        if (amount > product.stock) {
            setError(`No puedes mermar más del stock actual (${product.stock}).`);
            return;
        }

        setError(null);
        setIsSubmitting(true);
        onBusyChange(true);
        try {
            await createStockAdjustment({
                productId: product.id,
                quantity: amount,
                reason,
                notes: notes.trim(),
            });
            toast.success('Merma registrada. Stock actualizado.');
            onSuccess(); // recarga el producto para ver el nuevo stock
            onClose();
        } catch (err) {
            setError(getErrorMessage(err, 'Error al registrar la merma.'));
        } finally {
            setIsSubmitting(false);
            onBusyChange(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-end justify-between rounded-xl border border-red-900/30 bg-red-950/20 p-4">
                <div>
                    <label
                        htmlFor={`${uid}-qty`}
                        className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-red-400"
                    >
                        Unidades Inservibles
                    </label>
                    <p className="text-[10px] text-zinc-500">Stock máximo disponible: {product.stock}</p>
                </div>
                <input
                    id={`${uid}-qty`}
                    required
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max={product.stock}
                    step="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                    className="w-24 rounded-lg border border-red-900 bg-zinc-950 px-3 py-2 text-center font-mono text-xl text-white outline-none focus:border-red-500"
                />
            </div>

            <div role="group" aria-labelledby={`${uid}-reason`}>
        <span
            id={`${uid}-reason`}
            className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-zinc-400"
        >
          Clasificación del Daño
        </span>
                <div className="grid grid-cols-2 gap-2">
                    {STOCK_ADJUSTMENT_REASONS.map((r) => (
                        <button
                            key={r.id}
                            type="button"
                            aria-pressed={reason === r.id}
                            onClick={() => setReason(r.id)}
                            className={`rounded-lg border py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                reason === r.id
                                    ? 'border-red-500 bg-red-600/20 text-red-400'
                                    : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label
                    htmlFor={`${uid}-notes`}
                    className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-zinc-400"
                >
                    Observaciones (Opcional)
                </label>
                <textarea
                    id={`${uid}-notes`}
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. La caja llegó mojada por la lluvia..."
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-red-500"
                />
            </div>

            <div className="space-y-3 pt-2">
                {error && (
                    <p role="alert" className="font-mono text-xs text-red-400">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-red-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? 'Procesando Ajuste...' : 'Descontar del Inventario'}
                </button>
            </div>
        </form>
    );
}