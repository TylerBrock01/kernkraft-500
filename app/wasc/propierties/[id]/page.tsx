import Link from "next/link";
import { notFound } from "next/navigation";
import {propertiesData} from "@/app/wasc/data/propierties";

interface PropertyDetailProps {
    params: {
        id: string;
    };
}

export default async function PropertyDetailPage({ params }: PropertyDetailProps) {
    const { id } = await params;
    const property = propertiesData.find((p) => p.id === id);

    // Si no existe la propiedad, lanzamos un error 404 limpio
    if (!property) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <Link href="/wasc/propierties" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
                ← Volver al catálogo
            </Link>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="h-96 w-full relative">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">{property.location}</span>
                            <h1 className="text-3xl font-bold text-gray-900 mt-1">{property.title}</h1>
                        </div>
                        <div className="text-3xl font-black text-gray-900">
                            {property.price}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 my-6">
                        <div className="text-center">
                            <span className="block text-gray-400 text-sm">Recámaras</span>
                            <span className="text-xl font-bold text-gray-800">{property.bedrooms}</span>
                        </div>
                        <div className="text-center border-x border-gray-100">
                            <span className="block text-gray-400 text-sm">Baños</span>
                            <span className="text-xl font-bold text-gray-800">{property.bathrooms}</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-gray-400 text-sm">Superficie</span>
                            <span className="text-xl font-bold text-gray-800">{property.sqm} m²</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Acerca de esta propiedad</h3>
                        <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>

                    {/* Botón de acción para agendar cita */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm">
                            Agendar Visita por WhatsApp
                        </button>
                        <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm">
                            Contactar Asesor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}