// /app/hmcs/menu/loading.tsx
export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-busy="true">
            <div className="mb-8 h-9 w-40 animate-pulse rounded bg-[#2C4A3E]/10" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-64 animate-pulse rounded-2xl bg-[#2C4A3E]/10" />
                ))}
            </div>
        </main>
    );
}