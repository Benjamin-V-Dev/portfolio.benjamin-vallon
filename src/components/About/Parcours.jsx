'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Parcours() {
    const parcoursData = [
        {
            periode: "Mars 2024 - Aujourd'hui",
            pointColor: 'rgb(255,143,86)',
            titre: 'Freelance',
            description: "Création de sites et d'applications web",
            url: 'https://benjamin-vallon.fr',
        },
        {
            periode: 'Sept 2023 - Mars 2024',
            pointColor: 'rgb(255,143,86)',
            titre: 'Open Classrooms',
            description: 'Formation développeur web',
            url: 'https://openclassrooms.com/fr/',
        },
        {
            periode: 'Sept 2022 - Août 2023',
            pointColor: 'rgb(255,143,86)',
            titre: 'My Digital School',
            description: '1ére année de Bachelor Développeur Web',
            url: 'https://www.mydigitalschool.com/',
        },
        {
            periode: 'Juin 2019 - Juin 2022',
            pointColor: 'rgb(28,62,104)',
            titre: 'FIDI',
            description: "Membre du conseil d'administration",
            url: 'https://lafidi.fr/',
        },
        {
            periode: 'Janv 2018 - Janv 2021',
            pointColor: 'rgb(158,193,68)',
            titre: 'Expertise Diagnostic Habitat',
            description: "Responsable d'agence",
            url: 'https://edh-diagnostic.fr/',
        },
        {
            periode: 'Avr 2015 - Août 2022',
            pointColor: 'rgb(158,193,68)',
            titre: 'Expertise Diagnostic Habitat',
            description: 'Diagnostiqueur immobilier',
            url: 'https://edh-diagnostic.fr/',
        },
    ];

    // Référence pour détecter la visibilité de la section
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Animation déclenchée une seule fois

    // Variants pour les animations
    const lineVariants = {
        hidden: { height: 0 },
        visible: {
            height: '100%',
            transition: { duration: 2, ease: 'easeInOut' },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 2, ease: 'easeOut' },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // Décale chaque enfant
            },
        },
    };

    return (
        <div className='my-36'>
            <h2 className='heading1 text-customBlue text-center'>
                Parcours
            </h2>
            <motion.div
                ref={ref} // Référence pour la détection
                className='relative bg-customDarkGray flex flex-col gap-10 mt-10 py-20 rounded-[30px] sm:p-6'
                variants={containerVariants}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'} // Active uniquement lorsque visible
            >
                {/* Ligne verticale animée */}
                <motion.div
                    className='absolute top-0 left-1/2 w-[2px] bg-white -translate-x-1/2'
                    variants={lineVariants}></motion.div>

                {parcoursData.map((parcours, index) => (
                    <motion.div
                        key={index}
                        className='relative flex justify-center items-center'
                        variants={itemVariants}>
                        <div className='w-[45%] flex justify-end'>
                            <p
                                className='bg-[rgb(245,143,86)] text-[13px] font-extrabold rounded-[12px] flex flex-col justify-center items-center w-26 sm:w-44 px-4 py-2'
                                style={{
                                    backgroundColor: parcours.pointColor,
                                }}>
                                {parcours.periode}
                            </p>
                        </div>
                        <div className='w-[10%] flex justify-center items-center'>
                            <div
                                className='h-4 w-4 rounded-full flex justify-center items-center'
                                style={{
                                    backgroundColor: parcours.pointColor,
                                }}>
                                <div className='h-2 w-2 bg-white rounded-full'></div>
                            </div>
                        </div>
                        <div className='w-[45%] flex flex-col'>
                            <div className='bg-customGrayTags rounded-[10px] md:rounded-[20px] p-3 max-w-[350px]'>
                                <a href={parcours.url} target='_blank' rel='noopener noreferrer' className='text-[15px] font-bold'>
                                    {parcours.titre}
                                </a>
                                <p className='text-[13px] w-full'>
                                    {parcours.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
