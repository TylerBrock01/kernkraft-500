'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { AdjustableProduct } from '@/app/features/inventory/types';
import { useEscapeKey } from '@/app/lib/hooks/useEscapeKey';
import { StockAdjustmentForm } from './stock-adjustment/StockAdjustmentForm';

interface StockAdjustmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    product: AdjustableProduct;
}

export default function StockAdjustmentModal({
                                                 isOpen,
                                                 onClose,
                                                 onSuccess,
                                                 product,
                                             }: StockAdjustmentModalProps) {
    const titleId = useId();
    const [isBusy, setIsBusy] = useState(false);

    // Mientras se procesa el ajuste no se puede cerrar (ni con Escape, ni con el fondo, ni con ✕)
    const requestClose = () => {
        if (!isBusy) onClose();
    };

    useEscapeKey(isOpen, requestClose);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={requestClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        className="relative w-full max-w-md rounded-2xl border border-red-900/30 bg-zinc-950 p-6 shadow-2xl"
                    >
                        <header className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                            <div>
                                <h2 id={titleId} className="text-xl font-black uppercase tracking-tight text-red-500">
                                    Declarar Merma
                                </h2>
                                <p className="mt-1 font-mono text-[10px] text-zinc-500">
                                    ID: {product.id} | {product.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={requestClose}
                                disabled={isBusy}
                                aria-label="Cerrar"
                                className="text-zinc-500 hover:text-white disabled:opacity-30"
                            >
                                <span aria-hidden>✕</span>
                            </button>
                        </header>

                        <StockAdjustmentForm
                            product={product}
                            onSuccess={onSuccess}
                            onClose={onClose}
                            onBusyChange={setIsBusy}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}