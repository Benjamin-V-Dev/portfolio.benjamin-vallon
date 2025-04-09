import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { rateLimit } from './utils/rateLimit';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Ajout des en-têtes de sécurité
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload',
    );
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

    // Protection des routes API
    if (request.nextUrl.pathname.startsWith('/api/')) {
        // Vérification du rate limiting
        const rateLimitResponse = rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        // Routes publiques qui ne nécessitent pas d'authentification
        const publicRoutes = ['/api/auth', '/api/sendMail'];
        const isPublicRoute = publicRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route),
        );

        if (!isPublicRoute) {
            const token = await getToken({ req: request });

            if (!token) {
                return new NextResponse(
                    JSON.stringify({ error: 'Non autorisé' }),
                    {
                        status: 401,
                        headers: { 'content-type': 'application/json' },
                    },
                );
            }
        }
    }

    return response;
}

export const config = {
    matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
