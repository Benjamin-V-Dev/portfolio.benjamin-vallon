'use client';

// Basé sur un composant de : https://www.hover.dev/components/sign-in

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie, getCookie } from 'cookies-next';
import { signOut, useSession } from 'next-auth/react';

export default function Visitor() {
    const { data: session } = useSession();
    const router = useRouter();

    const onContinue = async () => {
        try {
            // Déconnexion
            await signOut({ redirect: false });

            // Création du cookie
            const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h
            setCookie('guest', 'true', {
                expires,
                path: '/',
            });

            // Attendre un court instant pour s'assurer que le cookie est bien créé
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Vérification du cookie
            const guestCookie = getCookie('guest');

            if (guestCookie === 'true') {
                toast.success('Vous êtes connecté en tant que visiteur');
                // Utiliser window.location pour forcer une redirection complète
                window.location.href = '/dashboard';
            } else {
                toast.error('Erreur lors de la connexion en tant que visiteur');
            }
        } catch (error) {
            console.error('Erreur dans onContinue:', error);
            toast.error('Une erreur est survenue');
        }
    };

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest === 'true');
    }, []);
    const [isGuest, setIsGuest] = useState(false);

    return (
        <div className=' text-zinc-200 selection:bg-zinc-600'>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1.25,
                    ease: 'easeInOut',
                }}
                className='relative z-10 mx-auto w-full max-w-4xl p-4'>
                <Heading />
                <button
                    onClick={onContinue}
                    className={twMerge(
                        'rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70',
                    )}>
                    Bon ok, j'avoue ! Je veux visiter le dashboard !
                </button>
                {isGuest && (
                    <p className='text-zinc-400 mt-10'>
                        ⚠️ Si la redirection automatique ne fonctionne pas{' '}
                        <Link href='/dashboard' className='text-blue-400'>
                            cliquez ici
                        </Link>
                    </p>
                )}
                {session?.user && (
                    <p className='text-zinc-400 mt-10'>
                        ⚠️ Si la redirection automatique ne fonctionne pas{' '}
                        <Link href='/dashboard' className='text-blue-400'>
                            cliquez ici
                        </Link>
                    </p>
                )}
            </motion.div>
        </div>
    );
}

const Heading = () => (
    <div>
        <div className='mb-9 mt-6 space-y-1.5'>
            <h1 className='heading1'>Entrée des visiteurs</h1>
            <p className='text-zinc-400'>
                - 👀 Je t'ai vu cliquer sur le cadenas petit curieux ! Tu veux
                voir l'espace administrateur, c'est ça ?{' '}
            </p>
            <p className='text-zinc-400'>
                - Non, je suis l'administrateur et je veux{' '}
                <Link href='/login/signin' className='text-blue-400'>
                    me connecter !
                </Link>
            </p>
            <p className='text-zinc-400'>
                - 😒 Es-tu bien sûr de ce que tu avances ?
            </p>
        </div>
    </div>
);
