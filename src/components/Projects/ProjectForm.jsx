'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { uploadImageToFirebase } from '@/firebase/uploadImageToFirebase';
import { loginAsAdmin } from '@/firebase/loginAsAdmin';
import { createProject } from '@/actions/create-project';
import { updateProject } from '@/actions/update-project';

export default function ProjectForm({
    mode = 'create', // "create" ou "edit"
    initialData = null, // Pour le mode "edit"
    onClose,
    onSuccess,
    isAdmin,
    isGuest,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [order, setOrder] = useState(1);
    const [maxOrder, setMaxOrder] = useState(1);
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const fileInputRef = useRef(null);

    // Login Firebase admin
    useEffect(() => {
        loginAsAdmin();
    }, []);

    // Récupération de l'ordre max
    useEffect(() => {
        const fetchMaxOrder = async () => {
            try {
                const res = await fetch('/api/projects/max-order');
                const data = await res.json();
                setMaxOrder(data.maxOrder + (mode === 'create' ? 1 : 0));
                setOrder(mode === 'create' ? data.maxOrder + 1 : order);
            } catch (err) {
                console.error('Erreur en récupérant maxOrder :', err);
            }
        };

        fetchMaxOrder();
    }, []);

    // Si en mode édition, on préremplit le formulaire
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setUrl(initialData.url || '');
            setOrder(initialData.order || 1);
            setSelectedSkills(initialData.tags || []);
        }
    }, [initialData, mode]);

    // Récupération des skills triés par le backend
    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            const data = await res.json();
            setSkills(data);
        };

        fetchSkills();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (mode === 'create' && !image)
            return toast.error('Aucune image sélectionnée');

        setIsLoading(true);
        try {
            await loginAsAdmin();

            let imageUrlToUse = initialData?.imageUrl || null;

            if (image) {
                imageUrlToUse = await uploadImageToFirebase(image, 'projects');
            }

            const payload = {
                name,
                description,
                imageUrl: imageUrlToUse,
                url,
                tags: selectedSkills,
                order,
            };

            if (mode === 'create') {
                await createProject(payload);
                toast.success('Projet ajouté !');
            } else {
                await updateProject(initialData._id, payload);
                toast.success('Projet modifié !');
            }

            // Reset le formulaire
            if (fileInputRef.current) fileInputRef.current.value = '';
            if (onSuccess) onSuccess();

            setName('');
            setDescription('');
            setImage(null);
            setUrl('');
            setOrder(1);
            setSelectedSkills([]);
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 z-40 backdrop-blur-sm bg-black/30 mx-1'>
            <div className='w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-customGrayTags p-6 rounded md:rounded-xl shadow-lg max-h-[90vh] overflow-y-auto scrollbar-hide'>
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='hover:scale-110 transition-all duration-300 ease-in-out'>
                        <FaTimes className='text-white text-xl' />
                    </button>
                </div>
                <h2 className='heading2 text-center my-4'>
                    {mode === 'edit'
                        ? 'Modifier un projet'
                        : 'Ajouter un projet'}
                </h2>
                <form onSubmit={onSubmit} className='w-full'>
                    {/* Image */}
                    <div className='mb-3'>
                        <label
                            htmlFor='image'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
                            Image du projet
                        </label>
                        <input
                            type='file'
                            accept='image/webp'
                            onChange={(e) => setImage(e.target.files[0])}
                            ref={fileInputRef}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>

                    {/* Nom */}
                    <div className='mb-3'>
                        <label
                            htmlFor='name'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
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

                    {/* Compétences */}
                    <label className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
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

                    {/* Description */}
                    <div className='mb-3'>
                        <label
                            htmlFor='description'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
                            Description
                        </label>
                        <textarea
                            required
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>

                    {/* URL */}
                    <div className='mb-3'>
                        <label
                            htmlFor='url'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
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

                    {/* Ordre */}
                    <div className='mb-3'>
                        <label
                            htmlFor='order'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
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

                    {/* Bouton Submit */}
                    {isAdmin && !isGuest && (
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
                                type='button'
                                onClick={() =>
                                    toast.error(
                                        mode === 'edit'
                                            ? 'Vous ne pouvez pas modifier un projet en mode invité'
                                            : 'Vous ne pouvez pas publier un projet en mode invité',
                                    )
                                }
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
