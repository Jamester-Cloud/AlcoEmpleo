import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/lib/jwtTokenControl'

export async function middleware(request: NextRequest) {
    // request path
    const path = request.nextUrl.pathname
    //rutas publicas
    const isPublicPath = path === '/login' || path === '/signup/enterprise' || path === '/signup/candidate' || path === '/verifyEmail' || path === '/'
    //rutas para usuarios juridicos(empresas)
    const isEnterprisePath = path === '/enterprise' || path === '/enterprise/premium' || path === 'enterprise/jobOffer' || path === 'enterprise/subscription'
    //Rutas para candidatos
    const isCandidatePath = path === '/candidate' || path === '/candidate/premium' || path === '/candidate/edit' || path === '/candidate/subscription'
    //Rutas para administrador
    const isAdminPath = path === '/admin'
    //token unico basado en una cookie
    //desincriptando el token para determinar el rol de la persona en el sistema
    //Si estamos logueados porque tenemos token y la ruta en la que estamos es publica, entonces solo veremos inicio
    const token = request.cookies.get('token')?.value || ''
    const tokenData: any = await isAuthenticated(request)
    //Espacio solo administrador
    if (isEnterprisePath || isCandidatePath && token) return NextResponse.redirect(new URL('/', request.nextUrl));
    //Espacio solo candidatos
    if (isEnterprisePath && tokenData.payload?.rol === 'Candidatos' && token) return NextResponse.redirect(new URL('/candidate', request.nextUrl));
    //Espacio solo empresa
    if (isCandidatePath && tokenData.payload?.rol === 'Empresas' && token) return NextResponse.redirect(new URL('/enterprise', request.nextUrl));
    //Veremos solo el landing porque, no podemos ver ni login ni registro, si estamos en sesion
    if (isPublicPath && token && isEnterprisePath && isCandidatePath && isAdminPath) return NextResponse.redirect(new URL('/', request.nextUrl));
    //if(isEnterprisePath && token) return NextResponse.redirect(new URL('candidate/', request.nextUrl))
    //cuando no estamos logueados
    if (!isPublicPath && !token) return NextResponse.redirect(new URL('/', request.nextUrl));
    //To do crear para usuarios premium y validar para usuarios tanto empresas como candidatos
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login/candidate',
        '/login/enterprise',
        '/signup/enterprise',
        '/signup/candidate',
        '/verifyEmail',
        '/enterprise',
        '/enterprise/jobOffer',
        '/enterprise/subscription',
        '/candidate/subscription',
        '/candidate/edit',
        '/admin'
    ]
}
