// /app/hmcs/_lib/whatsapp.ts
import { formatPrice } from "@/app/hmcs/_lib/format";
import {contact} from "@/app/hmcs/data/contact";

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

    return `https://wa.me/52${contact.phone}?text=${encodeURIComponent(message)}`;
}