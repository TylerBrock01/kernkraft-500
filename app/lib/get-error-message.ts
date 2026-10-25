import { isAxiosError } from 'axios';

export function getErrorMessage(
    error: unknown,
    fallback = 'Ocurrió un error inesperado.',
): string {
    if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        // Nest/class-validator devuelve string[] en errores de validación
        if (Array.isArray(message)) return message.join('. ');
        if (typeof message === 'string') return message;
        return fallback;
    }
    if (error instanceof Error) return error.message;
    return fallback;
}