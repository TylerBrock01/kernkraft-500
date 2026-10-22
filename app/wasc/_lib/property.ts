import {FALLBACK_IMAGE, getPropertyMeta} from "@/app/wasc/properties/_utils/property";

export interface PropertyMetadata {
    propertyTypes?: string;
    location?: string;
    bedrooms?: number | string;
    bathrooms?: number | string;
    sqm?: number | string;
    [key: string]: unknown; // otros atributos dinámicos del JSONB
}

export interface Property {
    id: number | string;
    name: string;
    price: number | string;
    image?: string;
    images?: string[];
    description?: string;
    type?: string; // tipo de negocio: 'retail', 'food'... NO el tipo de inmueble
    metadata?: PropertyMetadata;
    attributes?: PropertyMetadata; // fallback por compatibilidad
}
export function getPropertyType(property: Property): string | undefined {
    const meta = getPropertyMeta(property);
    return meta.propertyTypes;
}

export function getGalleryImages(property: Property): string[] {
    if (property.images?.length) return property.images;
    if (property.image) return [property.image];
    return [FALLBACK_IMAGE];
}