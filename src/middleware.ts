import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/lib/jwtTokenControl'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // request path
    const path = request.nextUrl.pathname
    //rutas publicas
    const isPublicPath = path === '/login' || path === '/signup/enterprise' || path === '/signup/candidate' || path === '/verifyEmail'
    //rutas para usuarios juridicos(empresas)
    const isEnterprisePath = path === '/enterprise' || path === '/enterprise/premium'
    //Rutas para candidatos
    const isCandidatePath = path === '/candidate' || path === '/candidate/premium'
    ///
    //token unico basado en una cookie
    //desincriptando el token para determinar el rol de la persona en el sistema
    //Si estamos logueados porque tenemos token y la ruta en la que estamos es publica, entonces solo veremos inicio
    const token = request.cookies.get('token')?.value || ''
    const tokenData: any = await isAuthenticated(request)
    //Espacio candidatos
    if (isEnterprisePath && tokenData.payload?.rol == 'Candidatos') return NextResponse.redirect(new URL('/candidate', request.nextUrl));
    //Espacio empresa
    if (isCandidatePath && tokenData.payload?.rol == 'Empresas') return NextResponse.redirect(new URL('/enterprise', request.nextUrl));
    //Veremos solo el landing porque, no podemos ver ni log in ni registro
    if (isPublicPath && token && !isEnterprisePath && !isCandidatePath) return NextResponse.redirect(new URL('/', request.nextUrl));
    //if(isEnterprisePath && token) return NextResponse.redirect(new URL('candidate/', request.nextUrl))
    //cuando no estamos logueados
    if (!isPublicPath && !token && !isEnterprisePath && !isCandidatePath) return NextResponse.redirect(new URL('/login', request.nextUrl));
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
        '/verifyEmail',
        '/enterprise',
        '/candidate'
    ]
}
