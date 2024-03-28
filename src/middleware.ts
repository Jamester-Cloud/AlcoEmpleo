import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // request path
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyEmail'

    const token = request.cookies.get('token')?.value || ''
    //Si estamos logueados porque tenemos token, entonces solo veremos inicio
    if (isPublicPath && token) return NextResponse.redirect(new URL('/', request.nextUrl));
    //cuando no estamos logueados
    if (!isPublicPath && !token) return NextResponse.redirect(new URL('/login', request.nextUrl));
    //To do crear para usuarios premium
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyEmail'
    ],
}
