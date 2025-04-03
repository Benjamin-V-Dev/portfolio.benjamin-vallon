'use client';
import { createProject } from '@/actions/create-project';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Projects() {
    // Variable
    const { data: session } = useSession();
    // States
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Fonction
    const onPrepareProject = async (formData) => {
        try {
            await createProject(formData);
            setName('');
        } catch (error) {
            return toast.error(error.message);
        }
    };
    return (
        <div>
            <h1 className='heading1 text-center'>Projets</h1>
            <form action={onPrepareProject} className='max-w-4xl'>
                <div className='mb-3'>
                    <label
                        htmlFor='name'
                        className='mb-1.5 block text-zinc-400'>
                        Nom du projet
                    </label>
                    <input
                        required
                        name='name'
                        id='name'
                        type='text'
                        placeholder='Nom du projet'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700'
                    />
                </div>
                <div className='mb-3'>
                    <label
                        htmlFor='description'
                        className='mb-1.5 block text-zinc-400'>
                        Description
                    </label>
                    <textarea
                        required
                        name='description'
                        id='description'
                        type='text'
                        rows={5}
                        placeholder='Description du projet'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700'
                    />
                </div>
            </form>
        </div>
    );
}
