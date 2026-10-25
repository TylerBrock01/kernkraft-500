import {formatMetadataValue} from "@/app/(dashboard)/dashboard/inventory/utils/product";

const MAX_VISIBLE = 3; // máximo en la tabla para no saturarla

const chipClass =
    'inline-flex items-center gap-1 rounded-md border border-zinc-700/50 bg-zinc-800/50 px-1.5 py-0.5 font-mono text-[9px]';

export function MetadataChips({ metadata }: { metadata?: Record<string, unknown> | null }) {
    const entries = Object.entries(metadata ?? {});
    if (entries.length === 0) return <span className="text-zinc-700">—</span>;

    const visible = entries.slice(0, MAX_VISIBLE);
    const hidden = entries.length - visible.length;

    return (
        <ul className="flex flex-wrap gap-1">
            {visible.map(([key, value]) => (
                <li key={key} className={`${chipClass} text-zinc-400`}>
                    <span className="text-zinc-500">{key}:</span>
                    <span className="max-w-[80px] truncate text-zinc-300">{formatMetadataValue(value)}</span>
                </li>
            ))}
            {hidden > 0 && <li className={`${chipClass} text-zinc-500`}>+{hidden} más</li>}
        </ul>
    );
}