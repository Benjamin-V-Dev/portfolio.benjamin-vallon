'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function NavigationButtons() {
    const router = useRouter();

    return (
        <div className='hidden md:block'>
            <div className='fixed top-[100px] left-[25px] flex gap-4'>
                <button
                    onClick={() => router.back()}
                    className='p-2 rounded hover:bg-customGrayTags transition'
                    aria-label='Reculer'
                    title='Reculer'>
                    <FaArrowLeft size={20} />
                </button>
                <button
                    onClick={() => router.forward()}
                    className='p-2 rounded hover:bg-customGrayTags transition'
                    aria-label='Avancer'
                    title='Avancer'>
                    <FaArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
