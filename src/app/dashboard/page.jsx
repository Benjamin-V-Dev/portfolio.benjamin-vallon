'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Dashboard from '@/components/Dashboard/Dashboard';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function DashboardPage() {
    // Cards
    const cards = [
        {
            url: '/dashboard/projects',
            title: 'Projets',
            subtitle:
                'Gestion des projets : création, modification, suppression et mise en relation avec la collection de compétences',
        },
        {
            url: '/dashboard/skills',
            title: 'Compétences',
            subtitle:
                'Gestion des compétences : création, modification, suppression',
        }
    ];
    // Variants pour les animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // Décale chaque enfant de 0.2s
            },
        },
    };

    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);

    return (
        <div>
            {/* Utilisateur connecté */}
            {session?.user && (
                <h1 className='heading1 text-center'>Bienvenue Benjamin</h1>
            )}
            {!session?.user && isGuest && (
                <h1 className='heading1 text-center'>
                    Espace administrateur (invité)
                </h1>
            )}
            {session?.user && (
                <p className='text-center'>Je suis un utilisateur connecté</p>
            )}
            {!session?.user && isGuest && (
                <p className='text-center'>
                    Le mode invité permets de parcourir le dashboard sans
                    interagir avec le contenu. Les fonctionnalités d'intéraction
                    (publier, supprimer, modifier ...) seront bloqués.
                </p>
            )}
            <motion.div
                className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 px-4 animate-fade-in'
                variants={containerVariants}
                initial='hidden'
                animate='visible'>
                {cards.map((card, index) => (
                    <Dashboard
                        key={index}
                        url={card.url}
                        title={card.title}
                        subtitle={card.subtitle}
                    />
                ))}
            </motion.div>
        </div>
    );
}
