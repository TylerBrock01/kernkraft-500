function formatValue(value: unknown): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}

export function MetadataList({ metadata }: { metadata?: Record<string, unknown> | null }) {
    const entries = Object.entries(metadata ?? {});
    if (entries.length === 0) return null;

    return (
        <div>
            <h3 className="mb-3 border-b border-blue-900/30 pb-2 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Atributos Extendidos (Universal JSONB)
            </h3>
            <dl className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
                {entries.map(([key, value]) => (
                    <div
                        key={key}
                        className="flex justify-between gap-4 border-b border-zinc-800/50 pb-2 text-xs last:border-b-0 last:pb-0"
                    >
                        <dt className="font-mono lowercase tracking-wide text-zinc-500">{key}:</dt>
                        <dd className="max-w-[200px] truncate font-medium text-zinc-300">{formatValue(value)}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}