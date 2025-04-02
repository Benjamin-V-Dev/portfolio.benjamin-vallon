'use client';

// Basé sur un composant de : https://www.hover.dev/components/sign-in

import React, { useState } from 'react';
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Login = ({ prepareCreateUser, prepareLogin }) => {
    const pathname = usePathname();
    const isSignUp = pathname === '/login/signup'; // ou contient "signup"
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
                <Heading isSignUp={isSignUp} />
                <SocialOptions />
                <Or />
                <Email
                    isSignUp={isSignUp}
                    prepareCreateUser={prepareCreateUser}
                    prepareLogin={prepareLogin}
                />
                {/* <Terms /> */}
            </motion.div>

            <CornerGrid />
        </div>
    );
};

const Heading = ({ isSignUp }) => (
    <div>
        <div className='mb-9 mt-6 space-y-1.5'>
            <h1 className='heading1'>
                {isSignUp ? 'Inscription' : 'Connexion'}
            </h1>
            <p className='text-zinc-400'>
                {isSignUp
                    ? 'Vous avez déjà un compte ? '
                    : "Vous n'avez pas encore de compte ? "}
                {isSignUp ? (
                    <Link href='/login/signin' className='text-blue-400'>
                        Connectez-vous !
                    </Link>
                ) : (
                    <Link href='/login/signup' className='text-blue-400'>
                        Créez en un !
                    </Link>
                )}
            </p>
        </div>
    </div>
);

const SocialOptions = () => (
    <div>
        <div className='mb-3 flex gap-3'>
            <BubbleButton
                disabled
                className='flex w-full justify-center py-3 hover:cursor-not-allowed'>
                <FaGoogle />
            </BubbleButton>
            <BubbleButton
                disabled
                className='flex w-full justify-center py-3 hover:cursor-not-allowed'>
                <FaGithub />
            </BubbleButton>
        </div>
    </div>
);

const Or = () => {
    return (
        <div className='my-6 flex items-center gap-3'>
            <div className='h-[1px] w-full bg-zinc-700' />
            <span className='text-zinc-400'>OU</span>
            <div className='h-[1px] w-full bg-zinc-700' />
        </div>
    );
};

const Email = ({ isSignUp, prepareCreateUser, prepareLogin }) => {
    const [showPassword, setShowPassword] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState('password');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                if (isSignUp) {
                    prepareCreateUser(formData);
                } else {
                    prepareLogin(formData);
                }
            }}>
            {isSignUp && (
                <div className='mb-3'>
                    <label
                        htmlFor='username'
                        className='mb-1.5 block text-zinc-400'>
                        Nom d'utilisateur
                    </label>
                    <input
                        required
                        name='username'
                        id='username'
                        type='text'
                        placeholder="Votre nom d'utilisateur"
                        className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700'
                    />
                </div>
            )}
            <div className='mb-3'>
                <label htmlFor='email' className='mb-1.5 block text-zinc-400'>
                    Email
                </label>
                <input
                    required
                    name='email'
                    id='email'
                    type='email'
                    placeholder='your.email@provider.com'
                    className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700'
                />
            </div>
            <div className='mb-6'>
                <div className='mb-1.5 flex items-end justify-between'>
                    <label htmlFor='password' className='block text-zinc-400'>
                        Mot de passe
                    </label>
                    {!isSignUp && (
                        <Link
                            href='#'
                            disabled
                            className='text-sm text-blue-400 hover:cursor-not-allowed'>
                            Mot de passe oublié ?
                        </Link>
                    )}
                </div>
                <div className='relative'>
                    <input
                        required
                        name='password'
                        id='password'
                        type={showPassword}
                        placeholder='••••••••••••'
                        className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 pr-10 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700'
                    />
                    <div
                        className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400'
                        onClick={() =>
                            setShowPassword((prev) =>
                                prev === 'password' ? 'text' : 'password',
                            )
                        }>
                        {showPassword === 'password' ? (
                            <FaEye />
                        ) : (
                            <FaEyeSlash />
                        )}
                    </div>
                </div>
            </div>
            {isSignUp && (
                <div className='mb-6'>
                    <div className='mb-1.5 flex items-end justify-between'>
                        <label
                            htmlFor='passwordConfirm'
                            className='block text-zinc-400'>
                            Confirmez votre mot de passe
                        </label>
                        {/* <a href='#' className='text-sm text-blue-400'>
                        Forgot?
                        </a> */}
                    </div>
                    <div className='relative'>
                        <input
                            required
                            name='passwordConfirm'
                            id='passwordConfirm'
                            type={showConfirmPassword}
                            placeholder='••••••••••••'
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 pr-10 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700'
                        />
                        <div
                            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400'
                            onClick={() =>
                                setShowConfirmPassword((prev) =>
                                    prev === 'password' ? 'text' : 'password',
                                )
                            }>
                            {showConfirmPassword === 'password' ? (
                                <FaEye />
                            ) : (
                                <FaEyeSlash />
                            )}
                        </div>
                    </div>
                </div>
            )}
            <SplashButton type='submit' className='w-full'>
                Valider
            </SplashButton>
        </form>
    );
};

const Terms = () => (
    <p className='mt-9 text-xs text-zinc-400'>
        By signing in, you agree to our{' '}
        <a href='#' className='text-blue-400'>
            Terms & Conditions
        </a>{' '}
        and{' '}
        <a href='#' className='text-blue-400'>
            Privacy Policy.
        </a>
    </p>
);

const SplashButton = ({ children, className, ...rest }) => {
    return (
        <button
            className={twMerge(
                'rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70',
                className,
            )}
            {...rest}>
            {children}
        </button>
    );
};

const BubbleButton = ({ children, className, ...rest }) => {
    return (
        <button
            className={twMerge(
                `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
        border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
        px-3 py-1.5
        text-zinc-50 transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-100
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-zinc-900
        hover:before:translate-y-[0%]
        active:scale-100`,
                className,
            )}
            {...rest}>
            {children}
        </button>
    );
};

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

export default Login;
