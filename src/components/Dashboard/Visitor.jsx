'use client';

// Basé sur un composant de : https://www.hover.dev/components/sign-in

import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export const Visitor = () => {
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
                className='relative z-10 mx-auto w-full max-w-xl p-4'>
                <Heading />
                <Link
                    href='/login/pass'
                    className={twMerge(
                        'rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70',
                    )}>
                    Bon ok, j'avoue ! Je veux visiter le dashboard !
                </Link>
            </motion.div>

            <CornerGrid />
        </div>
    );
};

const Heading = () => (
    <div>
        <div className='mb-9 mt-6 space-y-1.5'>
            <h1 className='heading1'>Visiteur</h1>
            <p className='text-zinc-400'>
                - 👀 Je t'ai vu cliquer sur le cadenas petit curieux ! Tu veux
                voir l'espace administrateur, c'est ca ?{' '}
            </p>
            <p className='text-zinc-400'>
                - Non, je suis l'administrateur et je veux{' '}
                <Link href='/login/signin' className='text-blue-400'>
                    me connecter !
                </Link>
            </p>
            <p className='text-zinc-400'>
                - 😒 tu es bien sur de ce que tu avance ?
            </p>
        </div>
    </div>
);

const CornerGrid = () => {
    return (
        <div
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                backgroundColor: 'transparent', // même fond que le body
            }}
            className='absolute inset-0 z-[-1] w-full h-full'></div>
    );
};

export default Visitor;
