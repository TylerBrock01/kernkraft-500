import type { PropertyMetadata } from "../../_lib/property";
import { PROPERTY_FEATURES } from "@/app/wasc/_lib/features";

const FEATURES = PROPERTY_FEATURES;

export function PropertyCardFeatures({ meta }: { meta: PropertyMetadata }) {
    // 1. Filtramos solo las características que tienen un valor válido
    const validFeatures = FEATURES.filter(({ key }) => {
        const value = meta[key];
        return value !== undefined && value !== null && value !== "";
    });

    // 2. Limitamos el número máximo de elementos a mostrar (ej. máximo 3 para que encaje perfecto en el grid)
    const limitedFeatures = validFeatures.slice(0, 3);

    if (limitedFeatures.length === 0) return null;

    return (
        <div className="grid grid-cols-3 gap-2 py-3 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs text-gray-600 mb-6 font-semibold text-center">
            {limitedFeatures.map(({ key, icon, label }) => {
                const value = meta[key];

                return (
                    <div key={key} className="flex flex-col items-center justify-center truncate px-1">
                        <span className="text-gray-400 font-normal text-[10px] uppercase tracking-wider truncate w-full">
                            {label}
                        </span>
                        <span className="text-gray-900 font-bold text-sm truncate w-full">
                            {icon} {value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}