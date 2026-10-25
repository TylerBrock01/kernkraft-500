import { isAxiosError } from 'axios';

const FALLBACK = 'Acceso denegado. Verifica tus credenciales.';

export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        // Nest/class-validator devuelve string[] en errores de validación
        if (Array.isArray(message)) return message.join('. ');
        if (typeof message === 'string') return message;
        return FALLBACK;
    }
    if (error instanceof Error) return error.message;
    return FALLBACK;
}