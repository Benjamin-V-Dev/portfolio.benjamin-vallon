import { cookies } from 'next/headers';
import { hasCookie } from 'cookies-next';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    let isAuthenticated = false;

    // Vérification de la session NextAuth
    const token = await getToken({ req: request });
    if (token) {
        isAuthenticated = true;
    }

    // Vérification visiteur est invité
    if (hasCookie('guest', { cookies })) {
        isAuthenticated = true;
    }

    if (!isAuthenticated) {
        // Redirection vers la page de connexion si non authentifié
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
};
