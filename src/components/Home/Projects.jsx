'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { deleteProject } from '@/actions/delete-project';
import { Tags } from '../Projects/Tags';
import ProjectForm from '../Projects/ProjectForm';

export default function Projects({ projects }) {
    const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);
    const [isOpenUpdateProject, setIsOpenUpdateProject] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const pathname = usePathname();
    const isAdmin = pathname === '/dashboard/projects';

    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);
    const [skills, setSkills] = useState([]);
    const [orderedProjects, setOrderedProjects] = useState([]);

    useEffect(() => {
        const guest = getCookie('guest');
        setIsGuest(guest?.toString() === 'true');
    }, []);

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            const data = await res.json();
            setSkills(data);
        };
        fetchSkills();
    }, []);

    useEffect(() => {
        setOrderedProjects(projects.sort((a, b) => a.order - b.order));
    }, [projects]);

    return (
        <>
            {isAdmin && (
                <button
                    onClick={() => setIsOpenCreateProject(!isOpenCreateProject)}
                    className='bg-customGrayTags px-4 py-2 text-white text-sm xl:text-lg font-bold rounded-[13px] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer mt-10 ms-2'>
                    Ajouter un projet
                </button>
            )}
            {isOpenCreateProject && (
                <ProjectForm
                    mode='create'
                    onClose={() => setIsOpenCreateProject(false)}
                    onSuccess={() => setIsOpenCreateProject(false)}
                    isAdmin={isAdmin}
                    isGuest={isGuest}
                />
            )}
            {isOpenUpdateProject && (
                <ProjectForm
                    mode='edit'
                    initialData={selectedProject}
                    onClose={() => {
                        setIsOpenUpdateProject(false);
                        setSelectedProject(null);
                    }}
                    onSuccess={() => {
                        setIsOpenUpdateProject(false);
                        setSelectedProject(null);
                    }}
                    isAdmin={isAdmin}
                    isGuest={isGuest}
                />
            )}

            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3  my-[50px] md:my-[100px] mx-auto'>
                {orderedProjects.map((project) => (
                    <motion.div key={project._id}>
                        <Project
                            project={project}
                            skills={skills}
                            isAdmin={isAdmin}
                            session={session}
                            isGuest={isGuest}
                            setSelectedProject={setSelectedProject}
                            setIsOpenUpdateProject={setIsOpenUpdateProject}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

function Project({
    project,
    skills,
    isAdmin,
    session,
    isGuest,
    setSelectedProject,
    setIsOpenUpdateProject,
}) {
    const [isLoading, setIsLoading] = useState(true);

    const tagObjects = skills.filter(
        (skill) =>
            Array.isArray(project.tags) &&
            project.tags.includes(skill._id?.toString()),
    );

    const onDeleteProject = async () => {
        if (!confirm('Supprimer ce projet ?')) return;

        try {
            await deleteProject(project._id);
            toast.success('Projet supprimé avec succès');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section>
            <div
                onClick={() => window.open(project.url, '_blank')}
                className='relative flex flex-col gap-10 bg-customDarkGray shadow-md rounded-[25px] p-[15px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
                <div className='relative w-full aspect-video'>
                    {isLoading && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='loader'></div>
                        </div>
                    )}
                    <div className='absolute inset-0 h-full w-full border-[1px] border-[#ffffff48] rounded-[14px]'>
                        <Image
                            src={project.imageUrl}
                            alt={`Capture d'écran du projet ${project.name} (${project.url})`}
                            fill
                            className={`absolute top-0 left-0 h-full w-full object-cover rounded-[14px] transition-opacity duration-500 ${
                                isLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </div>

                <div className='h-32'>
                    <h2 className='text-[18px] font-extrabold mb-2'>
                        {project.name}
                    </h2>
                    <p className='text-[13px]'>{project.description}</p>
                </div>
                <Tags tags={tagObjects} />

                {isAdmin && session?.user && (
                    <div className='absolute bottom-2 right-2 z-10'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onDeleteProject();
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
                                e.stopPropagation();
                                e.preventDefault();
                                toast.error(
                                    'Vous ne pouvez pas supprimer un projet en mode invité',
                                );
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 hover:cursor-not-allowed'>
                            <FaRegTrashAlt className='text-white text-xl' />
                        </button>
                    </div>
                )}
                {isAdmin && session?.user && (
                    <div className='absolute bottom-2 right-14 z-10'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSelectedProject(project);
                                setIsOpenUpdateProject((prev) => !prev);
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
                                e.stopPropagation();
                                e.preventDefault();
                                setSelectedProject(project);
                                setIsOpenUpdateProject((prev) => !prev);
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer'>
                            <FaPen className='text-white text-xl' />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
