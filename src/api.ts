import Cookies from 'js-cookie';
import { SalesResponseSchema } from "@/src/schema";

export async function getSalesByDate(date: string, serverToken?: string) {
    // 1. Obtenemos el token (del servidor o del cliente)
    const token = serverToken || Cookies.get('skate_token');

    // 2. Llamamos a NUESTRO propio Route Handler (el puente)
    const url = `/admin/sales/api?transactionDate=${date}`;

    const req = await fetch(url, {
        method: 'GET',
        headers: {
            // VITAL: Seguimos enviándolo para que el route.ts lo reciba
            'Authorization': `Bearer ${token?.trim()}`,
        }
    });

    if (!req.ok) return null;

    const json = await req.json();

    // 3. Validamos que la respuesta del puente sea correcta
    const result = SalesResponseSchema.safeParse(json);
    return result.success ? result.data : null;
}