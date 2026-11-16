// /app/hmcs/_lib/business.ts
export const BUSINESS = {
    name: "Las Hamacas",
    location: "Campus", // ajusta a la dirección real
    hours: "Lunes a viernes, 8:00 a 18:00", // debe coincidir con SCHEDULE
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
} as const;