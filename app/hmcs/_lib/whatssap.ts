// /app/hmcs/_lib/whatsapp.ts
import { formatPrice } from "@/app/hmcs/_lib/format";

// Número con código de país y sin símbolos, ej. 5216621234567
const WHATSAPP_NUMBER = contact.phone;

interface OrderLine {
    name: string;
    price: number;
    quantity: number;
}

export function buildWhatsAppUrl(lines: OrderLine[], total: number): string {
    const items = lines
        .map((l) => `• ${l.quantity} x ${l.name} - ${formatPrice(l.price * l.quantity)}`)
        .join("\n");

    const message = `Hola, quiero hacer este pedido en Las Hamacas:\n\n${items}\n\nTotal: ${formatPrice(total)}`;

    return `https://wa.me/52${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}