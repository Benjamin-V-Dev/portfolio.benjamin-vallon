'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export default function Dashboard() {
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);

    return (
        <div>
            {/* Utilisateur connecté */}
            {session?.user && <h1 className='heading1 text-center'>Bienvenue Benjamin</h1>}
            {!session?.user && isGuest && <h1 className='heading1 text-center'>Espace administrateur (invité)</h1>}
            {session?.user && <p className='text-center'>Je suis un utilisateur connecté</p>}
            {!session?.user && isGuest && <p className='text-center'>Le mode invité permets de parcourir le dashboard sans interagir avec le contenu. Les fonctionnalités d'intéraction (publier, supprimer, modifier ...) seront bloqués.</p>}
            <div className='flex'>
                <Link
                    href='/dashboard/projects'
                    className='border p-10 rounded'>
                    Projets
                </Link>
            </div>
        </div>
    );
}
