export function PropertiesError({ message }: { message: string }) {
    return (
        <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-100 text-red-600 font-medium">
            {message}
        </div>
    );
}