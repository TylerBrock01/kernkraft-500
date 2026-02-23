"use server"
import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schema";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"; // Importación correcta para el servidor
import { redirect } from "next/navigation";

export async function submitOrderAction(data: unknown) {
    // 1. Obtener el token desde el servidor
    const cookieStore = await cookies();
    const token = cookieStore.get('skate_token')?.value;

    // 2. Si no hay token, mandamos al login (Esto detiene la ejecución aquí)
    if (!token) {
        redirect('/login');
    }

    // 3. Validar datos con Zod
    const order = OrderSchema.parse(data);
    const url = `${process.env.API_URL}/transactions`;

    // 4. Petición a NestJS incluyendo el Bearer Token
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ¡No olvides pasar el token!
        },
        body: JSON.stringify(order)
    });

    const json = await req.json();

    // 5. Manejo de Errores (401, 403, 400, etc.)
    if (!req.ok) {
        // Si NestJS responde un 403 (Forbidden), podrías manejarlo específico
        if (req.status === 403) {
            return { errors: ["No tienes permisos de vendedor para esta acción"], success: "" };
        }

        const parsedError = ErrorResponseSchema.safeParse(json);
        return {
            errors: parsedError.success ? parsedError.data.message : ["Error inesperado en el servidor"],
            success: ""
        };
    }

    // 6. Éxito
    const successData = SuccessResponseSchema.parse(json);
    // revalidateTag('products-by-category');

    return {
        errors: [],
        success: successData.message,
    };
}
