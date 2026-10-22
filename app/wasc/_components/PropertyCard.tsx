import Link from "next/link";
import Image from "next/image";
import type { Property } from "../_lib/property";
import { PropertyCardFeatures } from "./PropertyCardFeatures";
import {formatPrice, getMainImage, getPropertyMeta} from "@/app/wasc/properties/_utils/property";

export function PropertyCard({ property }: { property: Property }) {
    const meta = getPropertyMeta(property);

    return (
        <article className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group">
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                    src={getMainImage(property)}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

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

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                    {property.name}
                </h3>

                <p className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                    {formatPrice(property.price)}
                </p>

                <PropertyCardFeatures meta={meta} />

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