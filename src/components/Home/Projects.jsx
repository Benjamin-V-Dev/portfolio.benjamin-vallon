'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { usePathname } from 'next/navigation';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { deleteProject } from '@/actions/delete-project';
import NewProject from '../Projects/NewProject';
import UpdateProject from '../Projects/UpdateProject';

export default function Projects({ projects }) {
    // States
    const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);
    const [isOpenUpdateProject, setIsOpenUpdateProject] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    //Pathname
    const pathname = usePathname();
    const isAdmin = pathname === '/dashboard/projects';
    // const cards = [
    //     {
    //         title: 'Thomas Lossie',
    //         description:
    //             "Portfolio de Thomas Lossie, directeur artistique. Création d'un site vitrine nominé aux Awwwards en Next.js, et d'un dashboard en React et Node.js.",
    //         linkUrl: 'https://thomas-lossie.fr',
    //         imgUrl: '/Lossie.webp',
    //         imgAlt: "Capture d'écran du site de Thomas Lossie, directeur artistique",
    //         tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    //     },
    //     {
    //         title: 'Betternglish',
    //         description:
    //             'Application web en Next.js pour améliorer son vocabulaire en anglais. Authentification et backend réalisé avec Firebase.',
    //         linkUrl: 'https://betternglish.fr',
    //         imgUrl: '/betternglish.webp',
    //         imgAlt: "Capture d'écran de l'application Betternglish",
    //         tags: ['Next.js', 'Firebase'],
    //     },
    //     {
    //         title: 'Sibane Diagnostics',
    //         description:
    //             "Site vitrine de Sibane Diagnostics, diagnostiqueur immobilier. Création d'un site vitrine avec générateur de devis en Next.js, et d'un dashboard en React et Node.js.",
    //         linkUrl: 'https://www.sibane.fr',
    //         imgUrl: '/sibane.webp',
    //         imgAlt: "Capture d'écran du site de Sibane Diagnostics, diagnostiqueur immobilier",
    //         tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    //     },
    //     {
    //         title: 'DiagInnov',
    //         description:
    //             "Site vitrine de DiagInnov, diagnostiqueur immobilier. Création d'un site vitrine en Next.js, et d'un dashboard en React et Node.js.",
    //         linkUrl: 'https://diaginnov47.fr/',
    //         imgUrl: '/diaginnov.webp',
    //         imgAlt: "Capture d'écran du site de DiagInnov, diagnostiqueur immobilier",
    //         tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    //     },
    //     {
    //         title: 'Map-Diag',
    //         description:
    //             "Création d'une application web en React et Node.js. Localisation des diagnostiqueurs immobiliers certifiés sur une carte intéractive.",
    //         linkUrl: 'https://map-diag.fr/',
    //         imgUrl: '/mapdiag.webp',
    //         imgAlt: "Capture d'écran de l'application Map-Diag",
    //         tags: ['React', 'Node.js', 'Leaflet', 'Google API'],
    //     },
    //     {
    //         title: 'LeBonDiagnostic.Immo',
    //         description:
    //             "Site vitrine LeBonDiagnostic.Immo, diagnostiqueur immobilier. Création d'un site vitrine en Next.js, et d'un dashboard en React et Node.js.",
    //         linkUrl: 'https://lebondiagnostic-immo.fr',
    //         imgUrl: '/lebondiagnosticimmo.webp',
    //         imgAlt: "Capture d'écran du site de LeBonDiagnostic.Immo, diagnostiqueur immobilier",
    //         tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    //     },
    //     {
    //         title: 'Recherche Conseil Inspection',
    //         description:
    //             "Site vitrine Recherche Conseil Inspection, expert en inspections approfondies. Création d'un site vitrine en Next.js, et d'un dashboard en React et Node.js.",
    //         linkUrl: 'https://rci-inspections.fr',
    //         imgUrl: '/rechercheconseilinspection.webp',
    //         imgAlt: "Capture d'écran du site de Recherche Conseil Inspection, expert en inspections approfondies",
    //         tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    //     },
    //     {
    //         title: 'JFA images',
    //         description:
    //             "Site vitrine de JFA Images, photographe professionnel. Création d'un site vitrine en Next.js, et d'un dashboard en React et Node.js.",
    //         linkUrl: 'https://jfa-images.fr',
    //         imgUrl: '/jfa-images.webp',
    //         imgAlt: "Capture d'écran du site de JFA Images, expert en photographe professionnel",
    //         tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    //     },
    // ];

    // Variants pour les animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // Décale chaque enfant de 0.2s
            },
        },
    };
    // Session and Guest
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
         const guest = getCookie('guest');
         setIsGuest(guest?.toString() === 'true');
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 }, // L'état initial (invisible et décalé vers le bas)
        visible: {
            opacity: 1, // Opacité devient visible
            y: 0, // Repositionne à sa position d'origine
            transition: {
                duration: 0.6, // Durée de la transition
                ease: 'easeOut', // Type de transition
            },
        },
    };

    return (
        <>
            {isAdmin && (
                <button
                    onClick={() => setIsOpenCreateProject(!isOpenCreateProject)}
                    className='bg-customGrayTags px-4 py-2 text-white text-lg font-bold rounded-[13px] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                    Ajouter un projet
                </button>
            )}
            {isOpenCreateProject && (
                <NewProject
                    setIsOpenCreateProject={setIsOpenCreateProject}
                    isAdmin={isAdmin}
                    session={session}
                    isGuest={isGuest}
                />
            )}
            {isOpenUpdateProject && (
                <UpdateProject
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    setIsOpenUpdateProject={setIsOpenUpdateProject}
                    isAdmin={isAdmin}
                    session={session}
                    isGuest={isGuest}
                />
            )}

            <motion.div
                className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 my-[50px] md:my-[100px]'
                variants={containerVariants} // Appliquer les variants au conteneur
                initial='hidden'
                animate='visible'>
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        variants={cardVariants} // Appliquer les variants à chaque carte
                    >
                        <Project
                            project={project}
                            isAdmin={isAdmin}
                            session={session}
                            isGuest={isGuest}
                            setSelectedProject={setSelectedProject}
                            setIsOpenUpdateProject={setIsOpenUpdateProject}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}

function Project({
    project,
    isAdmin,
    session,
    isGuest,
    setSelectedProject,
    setIsOpenUpdateProject,
}) {
    const [isLoading, setIsLoading] = useState(true);

    // Function to delete project
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
            <a
                href={project.url}
                rel='noreferrer noopener'
                target='_blank'
                className='relative flex flex-col gap-10 bg-customDarkGray shadow-md rounded-[25px] p-[15px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
                {/* Image avec loader */}
                <div className='relative w-full aspect-video'>
                    {isLoading && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='loader'></div>
                        </div>
                    )}
                    <div className='absolute inset-0 h-full w-full border-[1px] border-[#ffffff48] rounded-[14px]'>
                        <Image
                            src={project.imageUrl}
                            alt={project.altImage}
                            fill
                            className={`absolute top-0 left-0 h-full w-full object-cover rounded-[14px] transition-opacity duration-500 ${
                                isLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </div>

                {/* Contenu de la carte */}
                <div className='h-32'>
                    <h2 className='text-[18px] font-extrabold mb-2'>
                        {project.name}
                    </h2>
                    <p className='text-[13px]'>{project.description}</p>
                </div>
                <div className='mb-2 flex justify-start items-start flex-wrap gap-4 h-18 md:h-20 lg:h-20 xl:h-24 2xl:h-10'>
                    {/* {card.tags.map((tag, index) => (
                        <span
                            key={index}
                            className='bg-customGrayTags px-4 py-2 text-white text-[14px] font-bold rounded-[13px]'>
                            {tag}
                        </span>
                    ))} */}
                </div>
                {/* Bouton de suppression */}
                {isAdmin && session?.user && (
                    <div className='absolute bottom-2 right-2 z-10'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // empêche la propagation vers le <a>
                                e.preventDefault(); // empêche l'ouverture du lien
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
                                e.stopPropagation(); // empêche la propagation vers le <a>
                                e.preventDefault(); // empêche l'ouverture du lien
                                toast.error(
                                    'Vous ne pouvez pas supprimer un projet en mode invité',
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
                                e.stopPropagation(); // empêche la propagation vers le <a>
                                e.preventDefault(); // empêche l'ouverture du lien
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
                                e.stopPropagation(); // empêche la propagation vers le <a>
                                e.preventDefault(); // empêche l'ouverture du lien
                                setSelectedProject(project);
                                setIsOpenUpdateProject((prev) => !prev);
                            }}
                            className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer'>
                            <FaPen className='text-white text-xl' />
                        </button>
                    </div>
                )}
            </a>
        </section>
    );
}
