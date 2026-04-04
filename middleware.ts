import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Buscamos la llave maestra de CAZA
    const token = request.cookies.get('caza_token')?.value;
    const { pathname } = request.nextUrl;

    // 2. Si intenta entrar a operaciones (/dashboard o /pos) SIN token
    if ((pathname.startsWith('/dashboard') || pathname.startsWith('/pos')) && !token) {
        // Alerta roja: lo mandamos al login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Opcional pero recomendado: Si YA tiene token e intenta ir al login,
    // lo regresamos a su estación de trabajo para que no pierda el tiempo.
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/pos', request.url));
    }

    return NextResponse.next();
}

// Protegemos el Cuartel General y la ruta de acceso
export const config = {
    matcher: ['/dashboard/:path*', '/pos/:path*', '/login'],
};