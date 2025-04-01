'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function Presentation() {
    const [isLoading, setIsLoading] = useState(true);

    // Variants pour les animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Décale les enfants de 0.3s
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 }, // Départ invisible et décalé
        visible: {
            opacity: 1,
            y: 0, // Retour à sa position d'origine
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <motion.section
            className='mt-[50px] flex flex-col justify-center items-center lg:flex-row lg:gap-32'
            variants={containerVariants}
            initial='hidden'
            animate='visible'>
            {/* Image animée */}
            <motion.div
                className='relative w-full max-w-[500px] aspect-square bg-[rgb(38,37,62)] rounded-[68.78px]'
                variants={itemVariants}>
                {isLoading && (
                    <div className='absolute inset-0 top-0 left-0 h-full w-full flex items-center justify-center'>
                        <div className='loader'></div>
                    </div>
                )}

                <Image
                    src='/benjamin2.webp'
                    alt='Photo de Benjamin Vallon'
                    fill
                    className={`absolute top-0 left-0 h-full w-full rounded-[68.78px] object-contain transition-opacity duration-500 ${
                        isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setIsLoading(false)}
                />
            </motion.div>

            {/* Contenu textuel animé */}
            <motion.div
                className='mt-10 lg:mt-0'
                variants={itemVariants} // Animation pour l'ensemble du texte
            >
                <motion.h2
                    className='heading2 text-center lg:text-left'
                    variants={itemVariants} // Animation pour le titre
                >
                    À propos
                </motion.h2>
                <motion.h1
                    className='heading1 text-customBlue text-center lg:text-left'
                    variants={itemVariants} // Animation pour le sous-titre
                >
                    Benjamin Vallon
                </motion.h1>
                <motion.p
                    className='text-center mt-6 mx-auto sm:w-4/5 md:w-3/5 lg:w-4/5 lg:mx-0 lg:text-left'
                    variants={itemVariants} // Animation pour le paragraphe
                >
                    Développeur web frontend, j'utilise principalement React, Next.js,
                    Node.js et Firebase pour les sites et applications web que je crée.<br></br>Je m'intéresse également aux autres langages et frameworks pour enrichir en permanence mes connaissances et assouvir ma curiosité.
                </motion.p>
            </motion.div>
        </motion.section>
    );
}
