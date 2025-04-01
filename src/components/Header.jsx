'use client';

//importation des dépendances
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';
import useModalStore from '@/app/utils/useModalStore';
import Image from 'next/image';

export default function Header() {
    const { openModal } = useModalStore();
    // Déclaration des variables pour la navigation
    const pathname = usePathname();
    const navItems = [
        { name: 'Portfolio', href: '/' },
        { name: 'À propos', href: '/about' },
    ];

    return (
        <header className='fixed top-0 left-0 w-full bg-black z-40'>
            <div className='relative flex justify-around items-center flex-wrap overflow-x-hidden lg:px-20'>
                <Link
                    href='/'
                    className=' lg:w-1/4'>
                    <Image src="/logo_plein_blanc.svg" height={30} width={30}></Image>
                </Link>
                <nav className='order-3 w-full flex justify-center items-center h-[80px] text-[15px] font-bold text-txtGray lg:order-2 lg:w-2/4'>
                    {navItems.map((item) => (
                        <div
                            key={item.href}
                            className={`h-full w-1/3 ${
                                pathname === item.href
                                    ? 'border-b-4 border-customBlue'
                                    : 'border-b-4 border-transparent '
                            }`}>
                            <Link
                                href={item.href}
                                className={`h-full flex items-center justify-center border-b-4 border-transparent ${
                                    pathname === item.href
                                        ? 'text-customBlue'
                                        : 'text-customGray'
                                }`}>
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </nav>
                <div className='order-2 h-[80px] flex justify-end items-center lg:order-3 lg:w-1/4 relative '>
                    <div
                        onClick={openModal}
                        className='bg-customDarkGray p-3 rounded-full lg:rounded-[20px] lg:px-6 lg:py-3 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer lg:hidden'>
                        <Mail></Mail>
                    </div>
                    <div
                        onClick={openModal}
                        className='hidden lg:block bg-customDarkGray rounded-[20px] px-7 py-3 group overflow-hidden relative h-[50px] cursor-pointer'>
                        {/* Texte */}
                        <p className='text-[15px] font-extrabold transform transition-transform duration-300 group-hover:-translate-y-[200%]'>
                            Contact
                        </p>
                        {/* Icône */}
                        <Mail className='absolute left-1/2 bottom-[-50px] transform -translate-x-1/2 transition-all duration-300 group-hover:bottom-3' />
                    </div>
                </div>
                <div className='absolute bottom-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent'></div>
            </div>
        </header>
    );
}
