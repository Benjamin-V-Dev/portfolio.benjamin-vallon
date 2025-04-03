'use client';

import {
    Linkedin,
    Mail,
    Phone,
    Github,
    Cookie,
    FileText,
    Lock,
} from 'lucide-react';
import MailModal from '@/components/MailModal';
import useConsentStore from '@/utils/useConsentStore';
import useModalStore from '@/utils/useModalStore';
import Link from 'next/link';

export default function Footer() {
    const { isModalOpen, openModal, closeModal } = useModalStore();
    const resetConsent = useConsentStore((state) => state.resetConsent);

    return (
        <>
            <footer className='bg-transparent'>
                <div className='mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8'>
                    <div className='flex justify-center gap-x-6 md:order-2 flex-wrap gap-6'>
                        <a
                            href='https://www.linkedin.com/in/benjamin-vallon'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <span className='sr-only'>Logo Linkedin</span>
                            <Linkedin aria-hidden='true' className='size-6' />
                        </a>
                        <button
                            onClick={openModal} // Ouvre la modale
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <span className='sr-only'>Logo Email</span>
                            <Mail aria-hidden='true' className='size-6' />
                        </button>
                        <a
                            href='tel:+33745152542'
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <span className='sr-only'>Logo Téléphonne</span>
                            <Phone aria-hidden='true' className='size-6' />
                        </a>
                        <a
                            href='https://github.com/Benjamin-V-Dev'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <span className='sr-only'>Logo Github</span>
                            <Github aria-hidden='true' className='size-6' />
                        </a>
                        <a
                            title='Consulter mon CV'
                            href='/CV-Vallon-Benjamin-ATS.pdf'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <span className='sr-only'>Télécharger mon CV</span>
                            <FileText aria-hidden='true' className='size-6' />
                        </a>
                        <button
                            onClick={resetConsent}
                            title='Politique de confidentialité'
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <Cookie />
                        </button>
                        <Link
                            href='/dashboard'
                            title='Accéder au dashboard'
                            className='text-gray-400 hover:text-gray-300 w-1/6 sm:w-fit'>
                            <Lock />
                        </Link>
                    </div>
                    <p className='mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0'>
                        &copy; {new Date().getFullYear()} Benjamin Vallon. Tous
                        droits réservés.
                    </p>
                </div>
            </footer>
            {/* Modale */}
            <MailModal isOpen={isModalOpen} setIsOpen={closeModal} />
        </>
    );
}
