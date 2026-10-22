export const BUSINESS_SLUG = "wasc";

export const PROPERTY_TYPES = [
    "Todos",
    "Casa",
    "Departamento",
    "Terreno",
    "Lote",
    "Comercial",
] as const;

export type PropertyTypeFilter = (typeof PROPERTY_TYPES)[number];