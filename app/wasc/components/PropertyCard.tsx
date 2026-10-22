import Link from 'next/link';
import Image from 'next/image';

interface PropertyCardProps {
    property: {
        id: number | string;
        name: string;             // Nombre/Título del producto desde NestJS
        price: number | string;   // Precio desde NestJS
        image?: string;           // Thumbnail / Imagen única
        images?: string[];         // Galería text[] desde NestJS
        description?: string;
        type?: string;            // 'retail', 'food', etc.
        metadata?: Record<string, any>; // Atributos dinámicos en Postgres JSONB
        attributes?: Record<string, any>; // Fallback por compatibilidad
    };
}

const propertyFeatures = [
    {
        icon: '🛏️',
        label: 'Rec.',
        key: 'bedrooms',
    },
    {
        icon: '🛁',
        label: 'Baños',
        key: 'bathrooms',
    },
    {
        icon: '📐',
        label: 'm²',
        key: 'sqm',
    },
] as const;

export function PropertyCard({ property }: PropertyCardProps) {
    // 📸 Extraer la imagen principal o usar la primera de la galería
    const mainImage = property.images?.[0] || property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800';

    // 🧠 Unificar el acceso a metadatos dinámicos (JSONB)
    const meta = property.metadata || property.attributes || {};

    // 💰 Formatear precio
    const formattedPrice = typeof property.price === 'number'
        ? `$${property.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
        : property.price;

    return (
        <article className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group">
            {/* Contenedor de Imagen y Badge de Tipo */}
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                    src={mainImage}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Badge Superior: Tipo de Inmueble y Ubicación */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    {meta.propertyTypes && (
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md capitalize">
                            {meta.propertyTypes}
                        </span>
                    )}
                    {meta.location && (
                        <span className="bg-gray-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md truncate max-w-[60%] ml-auto">
                            {meta.location}
                        </span>
                    )}
                </div>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                    {property.name}
                </h3>

                <p className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                    {formattedPrice}
                </p>

                {/* Métricas técnicas dinámicas */}
                <div className="grid grid-cols-3 gap-2 py-3 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs text-gray-600 mb-6 font-semibold text-center">
                    {propertyFeatures.map((feature) => (
                        <div key={feature.key} className="flex flex-col items-center justify-center">
                            <span className="text-gray-400 font-normal text-[10px] uppercase tracking-wider">{feature.label}</span>
                            <span className="text-gray-900 font-bold text-sm">
                                {feature.icon} {meta[feature.key] ?? '-'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Botón de redirección a la ficha técnica */}
                <Link
                    href={`/wasc/properties/${property.id}`}
                    className="mt-auto block w-full text-center bg-gray-900 hover:bg-red-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm shadow-gray-900/10 active:scale-[0.99]"
                >
                    Ver Detalle
                </Link>
            </div>
        </article>
    );
}