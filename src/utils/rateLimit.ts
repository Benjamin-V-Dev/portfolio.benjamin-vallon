import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Stockage en mémoire des requêtes (à remplacer par Redis en production)
const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(request: NextRequest) {
    const ip = request.ip ?? '127.0.0.1';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 60; // 60 requêtes par minute

    // Nettoyage des anciennes entrées
    for (const [key, value] of requests.entries()) {
        if (value.resetTime <= now) {
            requests.delete(key);
        }
    }

    // Vérification ou création d'une nouvelle entrée
    const requestData = requests.get(ip) ?? {
        count: 0,
        resetTime: now + windowMs,
    };

    // Si la fenêtre de temps est dépassée, réinitialiser
    if (requestData.resetTime <= now) {
        requestData.count = 0;
        requestData.resetTime = now + windowMs;
    }

    // Incrémenter le compteur
    requestData.count++;
    requests.set(ip, requestData);

    // Vérifier si la limite est dépassée
    if (requestData.count > maxRequests) {
        return new NextResponse(JSON.stringify({ error: 'Trop de requêtes' }), {
            status: 429,
            headers: {
                'content-type': 'application/json',
                'Retry-After': Math.ceil(
                    (requestData.resetTime - now) / 1000,
                ).toString(),
            },
        });
    }

    return null;
}
