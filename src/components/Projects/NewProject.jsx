'use client';
import { createProject } from '@/actions/create-project';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { uploadImageToFirebase } from '@/firebase/uploadImageToFirebase';
import { loginAsAdmin } from '@/firebase/loginAsAdmin';
import { FaTimes } from 'react-icons/fa';
export default function NewProject({
    setIsOpenCreateProject,
    isAdmin,
    session,
    isGuest,
}) {
    // States
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [altImage, setAltImage] = useState('');
    const [url, setUrl] = useState('');
    // Refs
    const fileInputRef = useRef(null); // ← Ajoute cette ligne
    // Login as admin
    useEffect(() => {
        loginAsAdmin();
    }, []);

    // Fonction
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!image) return toast.error('Aucune image sélectionnée');

        try {
            await loginAsAdmin();

            const imageUrl = await uploadImageToFirebase(image, 'projects');

            await createProject({ name, description, imageUrl, url, altImage });

            toast.success('Projet ajouté !');
            setName('');
            setDescription('');
            setImage(null);
            setUrl('');
            setAltImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className='fixed inset-0 z-40 backdrop-blur-sm bg-black/30'>
            <div className='w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-customGrayTags p-6 rounded-xl shadow-lg'>
                <div className='flex justify-end'>
                    <button
                        onClick={() => setIsOpenCreateProject((prev) => !prev)}
                        className='hover:scale-110 transition-all duration-300 ease-in-out'>
                        <FaTimes className='text-white text-xl' />
                    </button>
                </div>
                <h2 className='heading2 text-center'>Ajouter un projet</h2>
                <form onSubmit={onSubmit} className='w-full'>
                    {/* Image of the project */}
                    <div className='mb-3'>
                        <label
                            htmlFor='image'
                            className='mb-1.5 block text-zinc-400'>
                            Image du projet
                        </label>
                        <input
                            required
                            type='file'
                            accept='image/webp'
                            onChange={(e) => setImage(e.target.files[0])}
                            ref={fileInputRef}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>
                    {/* Alt of the image */}
                    <div className='mb-3'>
                        <label
                            htmlFor='altImage'
                            className='mb-1.5 block text-zinc-400'>
                            Texte alternatif de l'image
                        </label>
                        <input
                            required
                            type='text'
                            value={altImage}
                            onChange={(e) => setAltImage(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>
                    {/* Name of the project */}
                    <div className='mb-3'>
                        <label
                            htmlFor='name'
                            className='mb-1.5 block text-zinc-400'>
                            Nom du projet
                        </label>
                        <input
                            required
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>
                    {/* Description of the project */}
                    <div className='mb-3'>
                        <label
                            htmlFor='description'
                            className='mb-1.5 block text-zinc-400'>
                            Description
                        </label>
                        <textarea
                            required
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>
                    {/* Url of the project */}
                    <div className='mb-3'>
                        <label
                            htmlFor='url'
                            className='mb-1.5 block text-zinc-400'>
                            Url du projet
                        </label>
                        <input
                            required
                            type='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>
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
                                        'Vous ne pouvez pas publier un projet en mode invité',
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
    );
}
