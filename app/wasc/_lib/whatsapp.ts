import { whatssapWasc } from "@/app/wasc/data/url";
import { SITE_URL } from "./config";
import { routes } from "./routes";
import {formatPrice, getPropertyMeta} from "@/app/wasc/properties/_utils/property";
import {getPropertyType, Property} from "@/app/wasc/_lib/property";

export function buildWhatsappUrl(property: Property): string {
    const meta = getPropertyMeta(property);

    const message = [
        "¡Hola! 👋",
        "",
        "Me interesa obtener más información sobre esta propiedad:",
        "",
        `🏠 *${property.name}*`,
        `📍 ${meta.location || "Ubicación exclusiva"}`,
        `💰 ${formatPrice(property.price)}`,
        "",
        `🔑 Tipo: ${getPropertyType(property) ?? "No especificado"}`,
        "",
        `🔗 Ver detalles: ${SITE_URL}${routes.property(property.id)}`,
        "",
        "¿Podemos agendar una visita?",
    ].join("\n");

    return `https://wa.me/52${whatssapWasc}?text=${encodeURIComponent(message)}`;
}