import { PROPERTY_FEATURES } from "@/app/wasc/_lib/features";
import { PropertyMetadata } from "@/app/wasc/_lib/property";

export function PropertyStats({ meta }: { meta: PropertyMetadata }) {
    // Filtramos únicamente las características que existen y tienen un valor válido en el objeto meta
    const activeFeatures = PROPERTY_FEATURES.filter((feature) => {
        const value = meta[feature.key];
        return value !== undefined && value !== null && value !== "";
    });

    // Si no hay características válidas para mostrar, podemos retornar null para ocultar el contenedor
    if (activeFeatures.length === 0) return null;

    return (
        <div className="grid grid-cols-3 gap-4 py-6 bg-gray-50/80 rounded-2xl px-4 border border-gray-100/80">
            {activeFeatures.map((feature, i) => {
                const value = meta[feature.key];

                return (
                    <div
                        key={feature.key}
                        className={`flex flex-col items-center justify-center text-center ${
                            i === 1 ? "border-x border-gray-200" : ""
                        }`}
                    >
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                            {feature.label}
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-lg md:text-xl">
                            <span>{feature.icon}</span>
                            <span>{value}</span>
                            {"unit" in feature && feature.unit && (
                                <span className="text-sm text-gray-500 font-normal">{feature.unit}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}