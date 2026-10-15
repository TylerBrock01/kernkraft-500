import {propertiesData} from "@/app/wasc/data/propierties";
import Link from "next/link";

export default function Propierties() {
    return(
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Catálogo de Propiedades</h1>
                <p className="text-gray-600 mt-2">Encuentra el hogar ideal diseñado para tu estilo de vida.</p>
            </div>

            {/* Cuadrícula de propiedades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {propertiesData.map((property) => (
                    <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                        <div className="relative h-48 w-full">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-sm font-semibold text-blue-600 mb-1">{property.location}</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                            <p className="text-2xl font-black text-gray-800 mb-4">{property.price}</p>

                            <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mb-6">
                                <span>🛏️ {property.bedrooms} Recámaras</span>
                                <span>🛁 {property.bathrooms} Baños</span>
                                <span>📐 {property.sqm} m²</span>
                            </div>

                            {/* Botón dinámico que redirige a catalog/[id] */}
                            <Link
                                href={`/wasc/propierties/${property.id}`}
                                className="mt-auto block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                            >
                                Ver Detalle
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}