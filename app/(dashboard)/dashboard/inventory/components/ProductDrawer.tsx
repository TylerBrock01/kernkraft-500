'use client';

import { useEffect, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ProductDetail } from '@/app/features/inventory/types';
import { ProductForm } from './product-form/ProductForm';

interface ProductDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    productToEdit?: ProductDetail | null;
}

export default function ProductDrawer({ isOpen, onClose, onSuccess, productToEdit }: ProductDrawerProps) {
    const titleId = useId();

    // Escape cierra el drawer
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm"
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
                    >
                        <header className="mb-6 flex shrink-0 items-center justify-between">
                            <h2 id={titleId} className="text-xl font-bold text-zinc-100">
                                {productToEdit ? 'Editar Expediente' : 'Nueva Carga'}
                            </h2>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Cerrar"
                                className="text-zinc-500 hover:text-white"
                            >
                                <span aria-hidden>✕</span>
                            </button>
                        </header>

                        <ProductForm
                            key={productToEdit?.id ?? 'new'}
                            productToEdit={productToEdit}
                            onSuccess={onSuccess}
                            onClose={onClose}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}