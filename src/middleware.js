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

    // Vérification si l'utilisateur est connecté
    if (hasCookie('__Secure-next-auth.session.token', { cookies })) {
        isAuthenticated = true;
    }
}
export const config = {
    matcher: ['/dashboard'],
};
