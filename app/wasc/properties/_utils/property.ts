import {Property, PropertyMetadata} from "@/app/wasc/_lib/property";

export const FALLBACK_IMAGE = "/images/property-placeholder.jpg"; // ponlo en /public

const priceFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
});

export function getPropertyMeta(property: Property): PropertyMetadata {
    return property.metadata ?? property.attributes ?? {};
}

export function getMainImage(property: Property): string {
    return property.images?.[0] || property.image || FALLBACK_IMAGE;
}

export function formatPrice(price: number | string): string {
    return typeof price === "number" ? priceFormatter.format(price) : price;
}