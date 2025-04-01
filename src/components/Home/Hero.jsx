import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className='my-10'>
            {/* Animation pour le titre */}
            <motion.h1
                className='heading1 text-center'
                initial={{ opacity: 0, y: -50 }} // Départ invisible et légèrement au-dessus
                animate={{ opacity: 1, y: 0 }} // Devient visible et revient à sa position d'origine
                transition={{ duration: 0.8, ease: 'easeOut' }} // Durée et type de transition
            >
                Benjamin Vallon <br />
                <span className='text-customBlue text-5xl sm:text-6xl md:text-7xl'>Développeur web</span>
            </motion.h1>

            {/* Animation pour le paragraphe */}
            <motion.p
                className='text-center mt-6 mx-auto sm:w-4/5 md:w-3/5 lg:w-2/5'
                initial={{ opacity: 0, y: 20 }} // Départ invisible et légèrement en-dessous
                animate={{ opacity: 1, y: 0 }} // Devient visible et revient à sa position d'origine
                transition={{ duration: 1, delay: 0.5 }} // Transition avec délai
            >
                ( A la recherche d'un poste en CDI sur Bordeaux )
            </motion.p>
        </section>
    );
}
