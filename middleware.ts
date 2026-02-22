import {NextRequest, NextResponse} from 'next/server'
// import type { NextRequest } from 'next/request'

export function middleware(request: NextRequest) {
    // Intentamos obtener el token de las cookies
    const token = request.cookies.get('skate_token')

    // Si el usuario intenta entrar a /admin pero NO tiene token
    if (request.nextUrl.pathname.startsWith('/admin') && !token) {
        // Lo mandamos al login de inmediato
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
}

// Aquí defines qué rutas debe vigilar el middleware
export const config = {
    matcher: ['/admin/:path*'], // Protege /admin y todo lo que esté adentro
}
