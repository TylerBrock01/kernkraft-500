import { NextResponse, type NextRequest } from 'next/server';
import { isTokenExpired } from '@/app/features/auth/utils/jwt';

const TOKEN_COOKIE = 'caza_token';
const USER_COOKIE = 'caza_user';
const LOGIN_PATH = '/login';
const HOME_PATH = '/dashboard';

const PROTECTED_PREFIXES = ['/dashboard', '/pos'];

const isProtected = (pathname: string) =>
    PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const token = request.cookies.get(TOKEN_COOKIE)?.value;
    const hasValidToken = !!token && !isTokenExpired(token);

    // Ruta protegida sin sesión válida → login (recordando a dónde iba)
    if (isProtected(pathname) && !hasValidToken) {
        const loginUrl = new URL(LOGIN_PATH, request.url);
        loginUrl.searchParams.set('next', pathname + search);

        const response = NextResponse.redirect(loginUrl);
        // Si había cookies vencidas, las limpiamos para cortar el bucle
        if (token) {
            response.cookies.delete(TOKEN_COOKIE);
            response.cookies.delete(USER_COOKIE);
        }
        return response;
    }

    // Ya autenticado intentando ver el login → a su estación
    if (pathname === LOGIN_PATH && hasValidToken) {
        return NextResponse.redirect(new URL(HOME_PATH, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/pos/:path*', '/login'],
};