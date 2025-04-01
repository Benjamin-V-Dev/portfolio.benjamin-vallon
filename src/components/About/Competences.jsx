'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Variants pour les animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Décale chaque enfant de 0.2s
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Composant pour une section de compétences
const CompetenceSection = ({ title, items }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.2 }); // Ajuste le threshold si besoin

    return (
        <>
            <h3 className='heading2 text-left w-full mt-10 sm:text-center'>
                {title}
            </h3>
            <motion.div
                ref={ref}
                className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-center mt-10 gap-2 mx-auto w-full sm:w-3/4 lg:gap-6'
                variants={containerVariants}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}>
                {items.map((competence, index) => (
                    <motion.div
                        key={index}
                        className='flex justify-center items-center'
                        variants={cardVariants}>
                        <p className='bg-customGrayTags px-6 py-3 text-white text-[15px] lg:text-[18px] font-bold rounded-[18px] w-full text-center'>
                            {competence}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default function Competences() {
    const integration = [
        'HTML',
        'CSS',
        'Sass',
        'Tailwind',
        'Material UI',
        'Bootstrap',
    ];
    const frontend = ['Javascript', 'Typescript', 'React', 'Next.js', 'Redux'];
    const backend = ['Node.js', 'Mongo DB', 'Firebase'];
    const deployment = ['Vercel', 'Firebase', 'VPS', 'Git / Github', 'CI / CD'];
    const mobile = ['React Native', 'Expo'];
    const tools = ['SEO', 'Accessibilité', 'AWS', 'Google API', 'Meta API'];

    return (
        <div className='my-36 lg:mt-0'>
            <h2 className='heading1 text-customBlue text-center'>
                Compétences
            </h2>

            <CompetenceSection title='Intégration :' items={integration} />
            <CompetenceSection title='Frontend :' items={frontend} />
            <CompetenceSection title='Backend :' items={backend} />
            <CompetenceSection title='Déploiement :' items={deployment} />
            <CompetenceSection title='Mobile :' items={mobile} />
            <CompetenceSection title='Autres connaissances :' items={tools} />
        </div>
    );
}
