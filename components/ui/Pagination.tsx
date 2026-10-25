interface Props {
    skip: number;
    shown: number; // filas en la página actual
    total: number;
    hasMore: boolean;
    isLoading?: boolean;
    onPrev: () => void;
    onNext: () => void;
}

const buttonClass =
    'rounded-md bg-zinc-800/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-30';

export function Pagination({ skip, shown, total, hasMore, isLoading = false, onPrev, onNext }: Props) {
    const from = shown === 0 ? 0 : skip + 1;
    const to = skip + shown;

    return (
        <nav
            aria-label="Paginación"
            className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/20 px-6 py-4"
        >
            <p aria-live="polite" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {total === 0 ? 'Sin registros' : `Mostrando ${from}–${to} de ${total}`}
            </p>

            <div className="flex gap-2">
                {/* Se bloquean mientras carga: así un doble clic no salta dos páginas */}
                <button type="button" onClick={onPrev} disabled={isLoading || skip === 0} className={buttonClass}>
                    Anterior
                </button>
                <button type="button" onClick={onNext} disabled={isLoading || !hasMore} className={buttonClass}>
                    Siguiente
                </button>
            </div>
        </nav>
    );
}