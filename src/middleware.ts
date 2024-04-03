import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // request path
    const path = request.nextUrl.pathname
    //rutas publicas
    const isPublicPath = path === '/login/candidate' || path === '/signup/enterprise' || path === '/signup/candidate' || path === '/verifyEmail'
    //token unico basado en una cookie
    const token = request.cookies.get('token')?.value || ''
    //Si estamos logueados porque tenemos token, entonces solo veremos inicio
    if (isPublicPath && token) return NextResponse.redirect(new URL('/', request.nextUrl));
    //cuando no estamos logueados
    if (!isPublicPath && !token) return NextResponse.redirect(new URL('/login', request.nextUrl));
    //To do crear para usuarios premium y validar para usuarios tanto empresas como candidatos
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login/candidate',
        '/login/enterprise',
        '/signup/enterprise',
        '/signup/candidate',
        '/verifyEmail'
    ],
}
