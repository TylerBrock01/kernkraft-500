'use client';

import type { MetadataRow } from '@/app/features/inventory/types';
import {createMetadataRow} from "@/app/(dashboard)/dashboard/inventory/utils/product-form";

interface Props {
    rows: MetadataRow[];
    onChange: (rows: MetadataRow[]) => void;
}

const inputClass =
    'flex-1 min-w-0 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-100 outline-none focus:ring-1 focus:ring-emerald-500';

export function MetadataEditor({ rows, onChange }: Props) {
    const update = (id: string, field: 'key' | 'value', value: string) =>
        onChange(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

    return (
        <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Atributos Dinámicos</h3>

            <div className="space-y-2">
                {rows.length > 0 && (
                    <div aria-hidden className="flex gap-2 px-1">
                        <span className="flex-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">Propiedad</span>
                        <span className="flex-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">Valor</span>
                        <span className="w-8" />
                    </div>
                )}

                {rows.map((row) => (
                    <div key={row.id} className="flex gap-2">
                        <input
                            type="text"
                            value={row.key}
                            onChange={(e) => update(row.id, 'key', e.target.value)}
                            placeholder="Propiedad..."
                            aria-label="Propiedad"
                            className={`${inputClass} font-mono`}
                        />
                        <input
                            type="text"
                            value={row.value}
                            onChange={(e) => update(row.id, 'value', e.target.value)}
                            placeholder="Valor..."
                            aria-label="Valor"
                            className={inputClass}
                        />
                        <button
                            type="button"
                            onClick={() => onChange(rows.filter((r) => r.id !== row.id))}
                            aria-label="Quitar atributo"
                            className="flex w-8 items-center justify-center rounded-lg border border-red-900/30 text-red-500 transition-colors hover:bg-red-500/10"
                        >
                            <span aria-hidden>✕</span>
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => onChange([...rows, createMetadataRow()])}
                    className="mt-2 block text-[10px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300"
                >
                    + Agregar Atributo
                </button>
            </div>
        </section>
    );
}