'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { deleteSkills } from '@/actions/delete-skills';
import SkillForm from './SkillForm';

const Cards = ({ skills, category }) => {
    return (
        <section className='my-10'>
            <h2 className='text-2xl font-bold mb-4'>{category}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {skills.map((skill) => (
                    <ShimmerBorderCard key={skill._id} skill={skill} />
                ))}
            </div>
        </section>
    );
};

const ShimmerBorderCard = ({ skill }) => {
    const [isOpenUpdateSkill, setIsOpenUpdateSkill] = useState(false);
    const pathname = usePathname();
    const isAdmin = pathname === '/dashboard/skills';
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);

    const onDeleteSkill = async () => {
        if (!confirm('Supprimer cette compétence ?')) return;

        try {
            await deleteSkills(skill._id);
            toast.success('Compétence supprimée avec succès');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            {isOpenUpdateSkill && (
                <SkillForm
                    mode='edit'
                    initialData={skill}
                    onClose={() => setIsOpenUpdateSkill(false)}
                    onSuccess={() => setIsOpenUpdateSkill(false)}
                    isAdmin={isAdmin}
                    isGuest={isGuest}
                />
            )}
            <div className='group relative mx-auto h-64 w-full max-w-sm overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50'>
                <div className='relative z-10 flex flex-col h-full items-center justify-center overflow-hidden rounded-[7px] bg-slate-900 p-8 transition-colors duration-500 group-hover:bg-slate-800'>
                    <div className='relative flex items-center justify-center aspect-square p-3 rounded-full h-20 w-20'>
                        <Image
                            src={skill.imageUrl}
                            alt={`Logo de ${skill.name}`}
                            fill
                            className='absolute top-0 left-0 w-full h-full object-contain'
                        />
                    </div>

                    <h2 className='relative z-10 mb-4 w-full heading2 text-center'>
                        {skill.name}
                    </h2>
                </div>

                <motion.div
                    initial={{ rotate: '0deg' }}
                    animate={{ rotate: '360deg' }}
                    style={{ scale: 1.75 }}
                    transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: 'linear',
                    }}
                    className='absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                />

                {isAdmin && (
                    <div className='absolute bottom-2 right-2 z-10'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (isGuest) {
                                    toast.error(
                                        'Vous ne pouvez pas supprimer une compétence en mode invité',
                                    );
                                } else {
                                    onDeleteSkill();
                                }
                            }}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                isGuest
                                    ? 'bg-red-500/60 cursor-not-allowed'
                                    : 'bg-red-500 hover:bg-red-600'
                            }`}>
                            <FaRegTrashAlt className='text-white text-xl' />
                        </button>
                    </div>
                )}

                {isAdmin && (
                    <div className='absolute bottom-2 right-14 z-10'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setIsOpenUpdateSkill(true);
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer'>
                            <FaPen className='text-white text-xl' />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cards;
