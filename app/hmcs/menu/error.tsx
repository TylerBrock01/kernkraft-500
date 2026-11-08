// /app/hmcs/menu/error.tsx
"use client";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h1 className="mb-2 text-2xl font-bold text-[#1E1E1E]">
                No pudimos cargar el menú
            </h1>
            <p className="mb-6 text-[#1E1E1E]/70">Intenta de nuevo en unos segundos.</p>
            <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-[#2C4A3E] px-6 py-3 font-semibold text-white hover:bg-[#1f352c]"
            >
                Reintentar
            </button>
        </main>
    );
}