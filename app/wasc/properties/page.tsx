import {propertiesData} from "@/app/wasc/data/properties";
import Link from "next/link";
import {PropertyCard} from "@/app/wasc/components/PropertyCard";

export default function Properties() {
    return(
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Catálogo de Propiedades</h1>
                <p className="text-gray-600 mt-2">Encuentra el hogar ideal diseñado para tu estilo de vida.</p>
            </div>

            {/* Cuadrícula de propiedades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {propertiesData.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    )
}