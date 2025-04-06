'use client';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { uploadImageToFirebase } from '@/firebase/uploadImageToFirebase';
import { loginAsAdmin } from '@/firebase/loginAsAdmin';
import { FaTimes } from 'react-icons/fa';
import { updateSkill } from '@/actions/update-skill';
export default function UpdateSkill({
    selectedSkill,
    setSelectedSkill,
    setIsOpenUpdateSkill,
    isAdmin,
    session,
    isGuest,
}) {
    // States
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    // Refs
    const fileInputRef = useRef(null); // ← Ajoute cette ligne
    // Login as admin
    useEffect(() => {
        loginAsAdmin();
    }, []);

    useEffect(() => {
        if (selectedSkill) {
            setName(selectedSkill.name || '');
            setDescription(selectedSkill.description || '');
            setTitle(selectedSkill.title || '');
            setCategory(selectedSkill.category || '');
        }
    }, [selectedSkill]);

    // Fonction
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginAsAdmin();

            let imageUrlToUse = selectedSkill.imageUrl;

            if (image) {
                imageUrlToUse = await uploadImageToFirebase(image, 'skills');
            }

            await updateSkill(selectedSkill._id, {
                name,
                description,
                imageUrl: imageUrlToUse,
                title,
                category,
            });

            toast.success('Projet modifié !');

            setIsOpenUpdateSkill(false);
            setSelectedSkill(null);
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div>
            <div className='fixed inset-0 z-40 backdrop-blur-sm bg-black/30'>
                <div className='w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-customGrayTags p-6 rounded-xl shadow-lg'>
                    <div className='flex justify-end'>
                        <button
                            className='hover:scale-110 transition-all duration-300 ease-in-out'
                            onClick={() => setIsOpenUpdateSkill(false)}>
                            <FaTimes className='text-white text-xl' />
                        </button>
                    </div>
                    <h2 className='heading2 text-center'>
                        Modifier une compétence
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
                                type='file'
                                accept='image/*'
                                onChange={(e) => setImage(e.target.files[0])}
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
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='px-4 py-2 text-white text-[14px] font-bold rounded-[13px] border hover:text-customGrayTags hover:bg-white'>
                                VALIDER
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
