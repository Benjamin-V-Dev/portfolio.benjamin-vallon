'use client';

import React from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';


export default function Pass() {
    // variable
    const router = useRouter();

    // function
    const onContinue = () => {
        // generate new cookie
        setCookie('guest', 'true');
        // Redirect
        router.push('/dashboard');
    };
    return (
        // <div className='flex flex-col gap-6'>
        //     <div className='flex items-center heading1 gap-6'>
        //         <Link href='/login'>⬅︎</Link>
        //         <h1>Mode visiteur</h1>
        //     </div>
        //     <p>
        //         Vous pourrez découvrir le dashboard mais les fonctionnalités
        //         d'intéraction (publier, supprimer, modifier ...) seront bloqués
        //     </p>

        //     <button className='border rounded p-4 w-fit' onClick={onContinue}>
        //         <span className='rotate-90'>➜</span> C'est parti !
        //     </button>
        // </div>
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
                <div>
                    <div className='mb-9 mt-6 space-y-1.5'>
                        <h1 className='heading1'>
                            Bienvenue sur le <br></br>mode visiteur !
                        </h1>
                        <p className='text-zinc-400'>
                            Tu pourras découvrir le dashboard mais les
                            fonctionnalités d'intéraction (publier, supprimer,
                            modifier ...) seront bloqués.
                        </p>
                    </div>
                </div>
                <button
                    onClick={onContinue}
                    className={twMerge(
                        'rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70',
                    )}>
                    J'ai attaché ma ceinture, je suis prêt pour la balade !
                </button>
            </motion.div>

            <div
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    backgroundColor: 'transparent', // même fond que le body
                }}
                className='absolute inset-0 z-[-1] w-full h-full'></div>
        </div>
    );
}
