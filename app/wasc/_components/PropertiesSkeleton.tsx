export function PropertiesSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    className="h-96 rounded-3xl bg-gray-100 animate-pulse border border-gray-200"
                />
            ))}
        </div>
    );
}