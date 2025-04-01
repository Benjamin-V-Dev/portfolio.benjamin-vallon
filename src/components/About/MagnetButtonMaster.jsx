'use client';

// Basé sur un composant de : https://www.hover.dev/components/buttons

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from 'framer-motion';
import { useRef } from 'react';
import { FileText } from 'lucide-react';

const MagnetButtonMaster = () => {
    return (
        <div className='hidden lg:flex justify-end min-h-[100px] bg-transparent p-4'>
            <MagnetButton />
        </div>
    );
};

const MagnetButton = () => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });
    const ySpring = useSpring(y, {
        mass: 3,
        stiffness: 400,
        damping: 50,
    });

    const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const { height, width, left, top } =
            ref.current.getBoundingClientRect();

        x.set(e.clientX - (left + width / 2));
        y.set(e.clientY - (top + height / 2));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <a
            title='Consulter mon CV'
            href='/CV-Vallon-Benjamin-ATS.pdf'
            target='_blank'
            rel='noopener noreferrer'>
            <span className='sr-only'>Télécharger mon CV</span>

            <motion.button
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transform }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className='group relative grid h-[150px] w-[150px] place-content-center rounded-full transition-colors duration-700 ease-out bg-[#5A67FD]'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='45'
                    height='45'
                    fill='none'
                    viewBox='0 0 45 45'>
                    <path
                        stroke='#fff'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16.875 20.625v11.25l3.75-3.75M16.875 31.875l-3.75-3.75'></path>
                    <path
                        stroke='#fff'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M41.25 18.75v9.375c0 9.375-3.75 13.125-13.125 13.125h-11.25C7.5 41.25 3.75 37.5 3.75 28.125v-11.25C3.75 7.5 7.5 3.75 16.875 3.75h9.375'></path>
                    <path
                        stroke='#fff'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M41.25 18.75h-7.5c-5.625 0-7.5-1.875-7.5-7.5v-7.5z'></path>
                </svg>
                <p className='font-extrabold'>CV</p>

                <div className='pointer-events-none absolute inset-0 z-0 scale-0 rounded-full transition-transform duration-700 ease-out group-hover:scale-100' />

                <motion.svg
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                    }}
                    style={{
                        top: '50%',
                        left: '50%',
                        x: '-50%',
                        y: '-50%',
                    }}
                    width='200'
                    height='200'
                    className='pointer-events-none absolute z-10'>
                    <path
                        id='circlePath'
                        d='M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0'
                        fill='none'
                    />
                    <text>
                        <textPath
                            href='#circlePath'
                            startOffset='0%'
                            className='fill-customBlue text-lg font-light uppercase opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100'>
                            &nbsp;Voir mon CV&nbsp;-&nbsp;Voir mon
                            CV&nbsp;-&nbsp;Voir mon CV&nbsp;-&nbsp;Voir mon
                            CV&nbsp;-&nbsp;Voir mon CV&nbsp;-
                        </textPath>
                    </text>
                </motion.svg>
            </motion.button>
        </a>
    );
};

export default MagnetButtonMaster;
