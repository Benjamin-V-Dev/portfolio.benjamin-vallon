"use client";
import { useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import useConsentStore from '@/app/utils/useConsentStore';
import {Cookie } from 'lucide-react';
import Link from 'next/link';

const POSITIVE_CONSENT_DURATION = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months in milliseconds
const NEGATIVE_CONSENT_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function ConsentManager() {
    const { consent, showConsentBanner, setConsent, setShowConsentBanner } =
        useConsentStore();

    useEffect(() => {
        try {
            const savedConsent = localStorage.getItem('userConsent');
            const savedConsentDate = localStorage.getItem('userConsentDate');

            if (savedConsent && savedConsentDate) {
                const now = new Date().getTime();
                const consentDate = new Date(savedConsentDate).getTime();
                const consentData = JSON.parse(savedConsent);

                if (consentData.analytics) {
                    if (now - consentDate < POSITIVE_CONSENT_DURATION) {
                        setConsent(consentData);
                    } else {
                        localStorage.removeItem('userConsent');
                        localStorage.removeItem('userConsentDate');
                        setShowConsentBanner(true);
                    }
                } else {
                    if (now - consentDate < NEGATIVE_CONSENT_DURATION) {
                        setConsent(consentData);
                    } else {
                        localStorage.removeItem('userConsent');
                        localStorage.removeItem('userConsentDate');
                        setShowConsentBanner(true);
                    }
                }
            } else {
                const timer = setTimeout(() => {
                    setShowConsentBanner(true);
                }, 3000); // 1000 ms = 1 second

                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.error('Failed to parse consent data', error);
        }
    }, [setConsent, setShowConsentBanner]);

    const handleConsent = useCallback(
        (givenConsent) => {
            setConsent(givenConsent);
            localStorage.setItem('userConsent', JSON.stringify(givenConsent));
            localStorage.setItem('userConsentDate', new Date().toISOString());
            setShowConsentBanner(false);
        },
        [setConsent, setShowConsentBanner],
    );

    return (
        <>
            <AnimatePresence>
                {showConsentBanner && consent === null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
                        onClick={() => setShowConsentBanner(false)}>
                        <motion.div
                            initial={{ scale: 0, rotate: '12.5deg' }}
                            animate={{ scale: 1, rotate: '0deg' }}
                            exit={{ scale: 0, rotate: '0deg' }}
                            onClick={(e) => e.stopPropagation()}
                            className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'>
                            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />
                            <div className='relative z-10'>
                                <div className='bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto'>
                                    <Cookie height={32} />
                                </div>
                                <h3 className='text-3xl font-bold text-center mb-2'>
                                    Gestion des cookies
                                </h3>
                                <p className='text-center mb-6'>
                                    Ce site utilise des cookies à des fins
                                    statistiques (voir la{' '}
                                    <a href="/politique-de-confidentialite" className='font-extrabold underline' target='_blank' rel='noopener noreferer'>politique de confidentialité</a>).
                                    Vous pouvez les accepter ou les refuser.
                                </p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() =>
                                            handleConsent({ analytics: false })
                                        }
                                        className='bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded border'>
                                        Refuser
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleConsent({ analytics: true })
                                        }
                                        className='bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded'>
                                        Accepter
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {consent?.analytics && <Analytics />}
        </>
    );
}
