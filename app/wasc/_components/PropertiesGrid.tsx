import {PropertyCard} from "@/app/wasc/_components/PropertyCard";
import {Property} from "@/app/wasc/_lib/property";

export function PropertiesGrid({ properties }: { properties: Property[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}