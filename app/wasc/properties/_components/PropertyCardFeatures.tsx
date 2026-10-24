import type { PropertyMetadata } from "../../_lib/property";
import { PROPERTY_FEATURES } from "@/app/wasc/_lib/features";

const FEATURES = PROPERTY_FEATURES;

export function PropertyCardFeatures({ meta }: { meta: PropertyMetadata }) {
    return (
        <div className="grid grid-cols-3 gap-2 py-3 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs text-gray-600 mb-6 font-semibold text-center">
            {FEATURES.map(({ key, icon, label }) => {
                // Obtenemos el valor del atributo en los metadatos
                const value = meta[key];

                // Verificamos si realmente tiene un valor válido (que no sea undefined, null o cadena vacía)
                const hasValue = value !== undefined && value !== null && value !== "";

                // Si no tiene valor, no renderizamos este elemento en el grid
                if (!hasValue) return null;

                return (
                    <div key={key} className="flex flex-col items-center justify-center">
                        <span className="text-gray-400 font-normal text-[10px] uppercase tracking-wider">
                            {label}
                        </span>
                        <span className="text-gray-900 font-bold text-sm">
                            {icon} {value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}