'use client';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import React, { useState, useEffect, useRef } from 'react';
import { loginAsAdmin } from '@/firebase/loginAsAdmin';
import { createSkills } from '@/actions/create-skills';
import { uploadImageToFirebase } from '@/firebase/uploadImageToFirebase';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';

export default function NewSkill() {
    // States
    const [isOpenCreateSkill, setIsOpenCreateSkill] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    // Refs
    const fileInputRef = useRef(null);
    //Pathname
    const pathname = usePathname();
    const isAdmin = pathname === '/dashboard/skills';
    // Login as admin
    useEffect(() => {
        loginAsAdmin();
    }, []);
    // Session and Guest
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);

    // Fonction
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!image) return toast.error('Aucune image sélectionnée');

        try {
            await loginAsAdmin();

            const imageUrl = await uploadImageToFirebase(image, 'skills');

            await createSkills({
                name,
                description,
                imageUrl,
                title,
                category,
            });

            toast.success('Compétence ajoutée !');
            setName('');
            setDescription('');
            setImage(null);
            setCategory('');
            setTitle('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsOpenCreateSkill(false);
    };
    return (
        <div>
            <button
                onClick={() => setIsOpenCreateSkill(true)}
                className='bg-customGrayTags px-4 py-2 text-white text-lg font-bold rounded-[13px] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                Ajouter une compétence
            </button>
            {isOpenCreateSkill && (
                <div className='fixed inset-0 z-40 backdrop-blur-sm bg-black/30'>
                    <div className='w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-customGrayTags p-6 rounded-xl shadow-lg'>
                        <div className='flex justify-end'>
                            <button
                                className='hover:scale-110 transition-all duration-300 ease-in-out'
                                onClick={() => setIsOpenCreateSkill(false)}>
                                <FaTimes className='text-white text-xl' />
                            </button>
                        </div>
                        <h2 className='heading2 text-center'>
                            Ajouter une compétence
                        </h2>
                        <form onSubmit={onSubmit} className='w-full'>
                            {/* Logo de la compétence */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='image'
                                    className='mb-1.5 block text-zinc-400'>
                                    Logo de la compétence
                                </label>
                                <input
                                    required
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                    ref={fileInputRef}
                                    className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                                />
                            </div>
                            {/* Nom de la compétence */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='name'
                                    className='mb-1.5 block text-zinc-400'>
                                    Nom de la compétence
                                </label>
                                <input
                                    required
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                                />
                            </div>
                            {/* titre de la compétence */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='title'
                                    className='mb-1.5 block text-zinc-400'>
                                    Titre de la compétence
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                                />
                            </div>
                            {/* Catégorie de la compétence */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='category'
                                    className='mb-1.5 block text-zinc-400'>
                                    Catégorie de la compétence
                                </label>
                            </div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'>
                                <option value=''>Choisir une catégorie</option>
                                <option value='Intégration web'>
                                    Intégration web
                                </option>
                                <option value='Frontend'>Frontend</option>
                                <option value='Backend'>Backend</option>
                                <option value='Fullstack'>Fullstack</option>
                                <option value='Déploiement'>Déploiement</option>
                                <option value='Application mobile'>
                                    Application mobile
                                </option>
                                <option value='Autres connaissances'>
                                    Autres connaissances
                                </option>
                            </select>
                            {/* description de la compétence */}
                            <div className='mb-3'>
                                <label
                                    htmlFor='description'
                                    className='mb-1.5 block text-zinc-400'>
                                    Description de la compétence
                                </label>
                                <textarea
                                    rows={5}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                                />
                            </div>
                            {/* Bouton de validation */}
                            {isAdmin && session?.user && (
                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className='px-4 py-2 text-white text-[14px] font-bold rounded-[13px] border hover:text-customGrayTags hover:bg-white'>
                                        VALIDER
                                    </button>
                                </div>
                            )}
                            {isAdmin && isGuest && (
                                <div className='flex justify-end'>
                                    <button
                                        onClick={() => {
                                            toast.error(
                                                'Vous ne pouvez pas publier une compétence en mode invité',
                                            );
                                        }}
                                        className='px-4 py-2 text-white text-[14px] font-bold rounded-[13px] border hover:cursor-not-allowed'>
                                        VALIDER
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
