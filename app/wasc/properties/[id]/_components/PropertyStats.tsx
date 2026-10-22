import { PROPERTY_FEATURES } from "@/app/wasc/_lib/features";
import {PropertyMetadata} from "@/app/wasc/_lib/property";

export function PropertyStats({ meta }: { meta: PropertyMetadata }) {
    return (
        <div className="grid grid-cols-3 gap-4 py-6 bg-gray-50/80 rounded-2xl px-4 border border-gray-100/80">
            {PROPERTY_FEATURES.map((feature, i) => (
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
                        <span>{feature.icon}</span> {meta[feature.key] ?? "-"}
                        {"unit" in feature && (
                            <span className="text-sm text-gray-500 font-normal">{feature.unit}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}