import { NextResponse, NextRequest, type ProxyConfig } from "next/server"

const publicRoutes = [
  {path:'/auth', whenAuthenticated: 'redirect'},
  {path:'/auth/recovery', whenAuthenticated: 'redirect'},
  {path:'/pricing', whenAuthenticated: 'next'},
  {path:'/about', whenAuthenticated: 'next'},
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/auth"

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')

  // const redirectURLL = request.nextUrl
  // console.log(redirectURLL)
  
  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectURL = request.nextUrl.clone()

    redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectURL)
  }
  
  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectURL = request.nextUrl.clone()
    

    redirectURL.pathname = '/'

    return NextResponse.redirect(redirectURL)
  }

  if (authToken && !publicRoute) {
    // Aqui é onde checamos se o JWT não está EXPIRADO e somente isso
    // Se sim, remover o cookie e redirecionar o usuário para login
    // Aplicar uma estratégia de refresh token

    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config: ProxyConfig = {
  matcher: [
  '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
