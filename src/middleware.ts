import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Solo proteger la ruta del administrador (actualizado a tu nuevo nombre)
  if (req.nextUrl.pathname.startsWith('/admin-gestion')) {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      // Decodificar base64 a string: "usuario:contraseña"
      const [user, pwd] = atob(authValue).split(':');

      // VALIDACIÓN: Aquí definimos el usuario y clave
      if (user === 'admin' && pwd === 'usmp2026') {
        return NextResponse.next(); // Acceso concedido
      }
    }

    // Si falla la contraseña o no hay, pedir autenticación nativa del navegador
    url.pathname = '/api/auth';
    return new NextResponse('Autenticación requerida', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Acceso Restringido al CMS USMP"',
      },
    });
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará este middleware
export const config = {
  matcher: ['/admin-gestion/:path*'],
};