'use client';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function Dashboard({ url, title, subtitle }) {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 }, // L'état initial (invisible et décalé vers le bas)
        visible: {
            opacity: 1, // Opacité devient visible
            y: 0, // Repositionne à sa position d'origine
            transition: {
                duration: 0.6, // Durée de la transition
                ease: 'easeOut', // Type de transition
            },
        },
    };
    return (
        <motion.div variants={cardVariants}>
            <Link
                href={url}
                className='relative flex flex-col gap-10 bg-customDarkGray shadow-md rounded-[25px] p-[15px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
                {/* Zone bleue avec titre */}
                <div className='relative w-full aspect-video bg-customBlue rounded-[14px] flex justify-center items-center'>
                    <p className='heading1 whitespace-nowrap truncate'>
                        {title}
                    </p>
                </div>

                {/* Contenu de la carte */}
                <div className='h-32'>
                    <h2 className='text-[18px] font-extrabold mb-2'>{title}</h2>
                    <p className='text-[13px]'>{subtitle}</p>
                </div>
            </Link>
        </motion.div>
    );
}
