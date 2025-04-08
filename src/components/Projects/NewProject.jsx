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
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [order, setOrder] = useState(1);
    const [maxOrder, setMaxOrder] = useState(1);
    const fileInputRef = useRef(null);

    useEffect(() => {
        loginAsAdmin();
    }, []);

    useEffect(() => {
        const fetchMaxOrder = async () => {
            try {
                const res = await fetch('/api/projects/max-order');
                const data = await res.json();
                setOrder(data.maxOrder + 1);
                setMaxOrder(data.maxOrder + 1);
            } catch (err) {
                console.error('Erreur en récupérant maxOrder :', err);
            }
        };

        fetchMaxOrder();
    }, []);

    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            const data = await res.json();
            const sortedSkills = data.sort((a, b) =>
                a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }),
            );
            setSkills(sortedSkills);
        };

        fetchSkills();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (!image) return toast.error('Aucune image sélectionnée');

        setIsLoading(true);
        try {
            await loginAsAdmin();
            const imageUrl = await uploadImageToFirebase(image, 'projects');
            const selectedSkillIds = selectedSkills;

            await createProject({
                name,
                description,
                imageUrl,
                url,
                tags: selectedSkillIds,
                order,
            });

            toast.success('Projet ajouté !');
            setName('');
            setDescription('');
            setImage(null);
            setUrl('');
            setOrder(1);
            setSelectedSkills([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setIsOpenCreateProject((prev) => !prev);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
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
                    <label className='mb-1.5 block text-zinc-400'>
                        Compétences liées au projet
                    </label>
                    <div className='mb-3 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'>
                        <div className='h-24 overflow-y-scroll scrollbar-hide space-y-2'>
                            {skills.map((skill) => (
                                <div
                                    key={skill._id}
                                    className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id={`skill-${skill._id}`}
                                        value={skill._id}
                                        checked={selectedSkills.includes(
                                            skill._id,
                                        )}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedSkills([
                                                    ...selectedSkills,
                                                    skill._id,
                                                ]);
                                            } else {
                                                setSelectedSkills(
                                                    selectedSkills.filter(
                                                        (id) =>
                                                            id !== skill._id,
                                                    ),
                                                );
                                            }
                                        }}
                                        className='accent-white'
                                    />
                                    <label
                                        htmlFor={`skill-${skill._id}`}
                                        className='text-sm text-white'>
                                        [{skill.category}] - {skill.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
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
                    <div className='mb-3'>
                        <label
                            htmlFor='order'
                            className='mb-1.5 block text-zinc-400'>
                            Ordre d’affichage
                        </label>
                        <input
                            type='number'
                            min='1'
                            max={maxOrder}
                            value={order}
                            onChange={(e) =>
                                setOrder(parseInt(e.target.value, 10))
                            }
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                        <p className='text-xs text-zinc-400 mt-1'>
                            Valeur max autorisée : {maxOrder}
                        </p>
                    </div>
                    {isAdmin && session?.user && (
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                disabled={isLoading}
                                className={`px-4 py-2 text-white text-[14px] font-bold rounded-[13px] border transition-all duration-300 ${
                                    isLoading
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:text-customGrayTags hover:bg-white'
                                }`}>
                                {isLoading ? 'Chargement...' : 'VALIDER'}
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
