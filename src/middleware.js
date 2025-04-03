import { cookies } from 'next/headers';
import { hasCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(request) {
    let isAuthenticated = false;

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
