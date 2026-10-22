import { PROPERTY_TYPES, type PropertyTypeFilter as FilterType } from "@/app/wasc/properties/constants";

interface Props {
    selected: FilterType;
    onChange: (type: FilterType) => void;
}

export function PropertyTypeFilter({ selected, onChange }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-gray-100">
            {PROPERTY_TYPES.map((type) => {
                const isActive = selected === type;
                return (
                    <button
                        key={type}
                        type="button"
                        onClick={() => onChange(type)}
                        className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95 ${
                            isActive
                                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                        }`}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
}