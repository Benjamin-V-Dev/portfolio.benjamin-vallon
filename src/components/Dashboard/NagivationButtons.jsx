'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function NavigationButtons() {
    const router = useRouter();

    return (
        <div className='fixed z-50 top-[165px] lg:top-[100px] left-[5px] right-[5px] w-full flex justify-between gap-4 lg:w-fit lg:left-[15px]'>
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
    );
}
