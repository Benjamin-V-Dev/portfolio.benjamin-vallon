'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';
import SkillForm from './SkillForm';

export default function BtnNewSkill() {
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);
    const [isOpenCreateSkill, setIsOpenCreateSkill] = useState(false);

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);

    const isAdmin = true; // ou à calculer si besoin

    return (
        <div className='flex justify-center my-6'>
            <button
                onClick={() => setIsOpenCreateSkill(true)}
                className='bg-customGrayTags px-4 py-2 text-white text-lg font-bold rounded-[13px] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                Ajouter une compétence
            </button>

            {isOpenCreateSkill && (
                <SkillForm
                    mode='create'
                    onClose={() => setIsOpenCreateSkill(false)}
                    onSuccess={() => setIsOpenCreateSkill(false)}
                    isAdmin={isAdmin}
                    isGuest={isGuest}
                />
            )}
        </div>
    );
}
