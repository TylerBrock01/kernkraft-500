import Link from 'next/link';

interface PropertyCardProps {
    property: {
        id: string;
        image: string;
        title: string;
        location: string;
        price: string;
        bedrooms: number;
        bathrooms: number;
        sqm: number;
    };
}

const propertyFeatures = [
    {
        icon: '🛏️',
        label: 'Recámaras',
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
    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="relative h-48 w-full">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm font-semibold text-blue-600 mb-1">
                    {property.location}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {property.title}
                </h3>

                <p className="text-2xl font-black text-gray-800 mb-4">
                    {property.price}
                </p>

                <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mb-6">
                    {propertyFeatures.map((feature) => (
                        <span key={feature.key}>
                            {feature.icon} {property[feature.key]} {feature.label}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/wasc/properties/${property.id}`}
                    className="mt-auto block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                    Ver Detalle
                </Link>
            </div>
        </article>
    );
}