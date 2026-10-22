import {Property} from "@/app/wasc/_lib/property";
import {formatPrice, getPropertyMeta} from "@/app/wasc/properties/_utils/property";


export function PropertyHeader({ property }: { property: Property }) {
    const meta = getPropertyMeta(property);

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    {meta.propertyTypes && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {meta.propertyTypes}
            </span>
                    )}
                    {meta.location && (
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {meta.location}
            </span>
                    )}
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {property.name}
                </h1>
            </div>
            <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight shrink-0">
                {formatPrice(property.price)}
            </div>
        </div>
    );
}