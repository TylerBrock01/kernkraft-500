interface Props {
    selectedType: string;
    onReset: () => void;
}

export function PropertiesEmpty({ selectedType, onReset }: Props) {
    return (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <span className="text-4xl block mb-2">🏠</span>
            <h3 className="text-lg font-bold text-gray-900">
                No hay propiedades disponibles
            </h3>
            <p className="text-sm text-gray-500 mt-1">
                Próximamente agregaremos más inmuebles en la categoría de {selectedType}.
            </p>
            <button
                type="button"
                onClick={onReset}
                className="mt-4 text-xs font-bold text-red-500 hover:underline"
            >
                Ver todas las propiedades
            </button>
        </div>
    );
}