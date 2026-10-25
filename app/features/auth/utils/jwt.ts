/**
 * Lee el `exp` de un JWT SIN verificar la firma.
 * Solo sirve para evitar redirecciones inútiles, NO es una validación de seguridad.
 */
export function isTokenExpired(token: string): boolean {
    try {
        const payload = token.split('.')[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const { exp } = JSON.parse(atob(base64));
        if (typeof exp !== 'number') return false; // sin exp: dejamos que decida el backend
        return exp * 1000 < Date.now();
    } catch {
        return true; // token malformado: lo tratamos como inválido
    }
}