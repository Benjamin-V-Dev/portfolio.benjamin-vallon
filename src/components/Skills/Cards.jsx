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
import UpdateSkill from './UpdateSkill';
const Cards = ({ skills,skill,category }) => {
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
    // States
    const [isOpenCreateSkill, setIsOpenCreateSkill] = useState(false);
    const [isOpenUpdateSkill, setIsOpenUpdateSkill] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    //Pathname
    const pathname = usePathname();
    const isAdmin = pathname === '/dashboard/skills';
    // Session and Guest
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);
    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);
    // Fonction de suppression d'une compétence
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
                <UpdateSkill
                    selectedSkill={selectedSkill}
                    setSelectedSkill={setSelectedSkill}
                    setIsOpenUpdateSkill={setIsOpenUpdateSkill}
                    isAdmin={isAdmin}
                    session={session}
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
                    <h3 className='relative z-10 mb-4 w-full heading3 text-center'>
                        {skill.title}
                    </h3>
                    <p className='relative z-10'>{skill.description}</p>
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
                {/* Bouton de suppression */}
                {isAdmin && session?.user && (
                    <div className='absolute bottom-2 right-2 z-10'>
                        <button
                            onClick={(e) => {
                                onDeleteSkill();
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 hover:cursor-pointer'>
                            <FaRegTrashAlt className='text-white text-xl' />
                        </button>
                    </div>
                )}
                {isAdmin && isGuest && (
                    <div className='absolute bottom-2 right-2 z-10'>
                        <button
                            onClick={(e) => {
                                toast.error(
                                    'Vous ne pouvez pas supprimer une compétence en mode invité',
                                );
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 hover:cursor-not-allowed'>
                            <FaRegTrashAlt className='text-white text-xl' />
                        </button>
                    </div>
                )}
                {/* Bouton de modification */}
                {isAdmin && session?.user && (
                    <div className='absolute bottom-2 right-14 z-10'>
                        <button
                            onClick={(e) => {
                                setSelectedSkill(skill);
                                setIsOpenUpdateSkill((prev) => !prev);
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer'>
                            <FaPen className='text-white text-xl' />
                        </button>
                    </div>
                )}
                {isAdmin && isGuest && (
                    <div className='absolute bottom-2 right-14 z-10'>
                        <button
                            onClick={(e) => {
                                setSelectedSkill(skill);
                                setIsOpenUpdateSkill((prev) => !prev);
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
