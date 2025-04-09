'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { loginAsAdmin } from '@/firebase/loginAsAdmin';
import { uploadImageToFirebase } from '@/firebase/uploadImageToFirebase';
import { createSkills } from '@/actions/create-skills';
import { updateSkill } from '@/actions/update-skill';

export default function SkillForm({
  mode = 'create',
  initialData = null,
  onClose,
  onSuccess,
  isAdmin,
  isGuest,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    loginAsAdmin();
  }, []);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setTitle(initialData.title || '');
      setCategory(initialData.category || '');
    }
  }, [initialData, mode]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'create' && !image)
      return toast.error('Aucune image sélectionnée');

    try {
      await loginAsAdmin();

      let imageUrlToUse = initialData?.imageUrl || '';

      if (image) {
        imageUrlToUse = await uploadImageToFirebase(image, 'skills');
      }

      const payload = {
        name,
        description,
        imageUrl: imageUrlToUse,
        title,
        category,
      };

      if (mode === 'create') {
        await createSkills(payload);
        toast.success('Compétence ajoutée !');
      } else {
        await updateSkill(initialData._id, payload);
        toast.success('Compétence modifiée !');
      }

      if (fileInputRef.current) fileInputRef.current.value = '';
      setName('');
      setDescription('');
      setImage(null);
      setCategory('');
      setTitle('');
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

    return (
        <div className='fixed inset-0 z-40 backdrop-blur-sm bg-black/30'>
            <div className='w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-customGrayTags p-6 rounded md:rounded-xl shadow-lg max-h-[90vh] overflow-y-auto scrollbar-hide'>
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='hover:scale-110 transition-all duration-300 ease-in-out'>
                        <FaTimes className='text-white text-xl' />
                    </button>
                </div>
                <h2 className='heading2 text-center'>
                    {mode === 'edit'
                        ? 'Modifier une compétence'
                        : 'Ajouter une compétence'}
                </h2>
                <form onSubmit={onSubmit} className='w-full'>
                    {/* Logo de la compétence */}
                    <div className='mb-3'>
                        <label
                            htmlFor='image'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
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

                    {/* Nom */}
                    <div className='mb-3'>
                        <label
                            htmlFor='name'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
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

                    {/* Titre */}
                    <div className='mb-3'>
                        <label
                            htmlFor='title'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
                            Titre de la compétence
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>

                    {/* Catégorie */}
                    <div className='mb-3'>
                        <label
                            htmlFor='category'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
                            Catégorie de la compétence
                        </label>
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
                    </div>

                    {/* Description */}
                    <div className='mb-3'>
                        <label
                            htmlFor='description'
                            className='mb-1.5 block text-zinc-400 text-xs sm:text-base'>
                            Description de la compétence
                        </label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2'
                        />
                    </div>

                    {/* Bouton Submit */}
                    {isAdmin && !isGuest && (
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
                </form>
            </div>
        </div>
    );
}