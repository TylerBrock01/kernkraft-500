// /app/hmcs/_lib/whatsapp.ts
import { formatPrice } from "@/app/hmcs/_lib/format";
import {contact} from "@/app/hmcs/data/contact";

interface OrderLine {
    name: string;
    price: number;
    quantity: number;
    category: string;
}

export function buildWhatsAppUrl(lines: OrderLine[], total: number): string {
    const byCategory = new Map<string, OrderLine[]>();
    for (const line of lines) {
        byCategory.set(line.category, [...(byCategory.get(line.category) ?? []), line]);
    }

    const sections = Array.from(byCategory, ([category, items]) => {
        const rows = items
            .map((l) => `• ${l.quantity} x ${l.name} - ${formatPrice(l.price * l.quantity)}`)
            .join("\n");
        return `*${category}*\n${rows}`;
    }).join("\n\n");

    const message = `Hola, quiero hacer este pedido en Las Hamacas:\n\n${sections}\n\nTotal: ${formatPrice(total)}`;

    return `https://wa.me/52${contact.phone}?text=${encodeURIComponent(message)}`;
}