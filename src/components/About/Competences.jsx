'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const ShuffleCards = () => {
    const isMobile = useIsMobile();
    const [skills, setSkills] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const positions = isMobile
        ? ['front', 'middle', 'back']
        : ['front', 'middle', 'back'];

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            const data = await res.json();
            setSkills(data);
        };
        fetchSkills();
    }, []);

    const handleShuffle = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
    };

    const getSkillAt = (offset) => {
        const index = (currentIndex + offset) % skills.length;
        return skills[index];
    };

    return (
        <div className='grid place-content-center overflow-hidden px-4 py-16 text-slate-50'>
            <h2 className='heading1 text-customBlue text-center mb-10'>
                Compétences
            </h2>

            {!showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className='mx-auto mb-12 rounded-xl bg-customBlue px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80'>
                    Poser le jeu de cartes
                </button>
            )}

            {showAll ? (
                <motion.div
                    key='grid'
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4'
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'>
                    {skills.map((skill) => (
                        <motion.div
                            key={skill._id}
                            variants={cardVariants}
                            className='rounded-2xl border-2 border-slate-700 bg-customDarkGray p-6 shadow-xl backdrop-blur-md flex flex-col items-center space-y-4'>
                            <div className='relative h-24 w-24'>
                                <Image
                                    src={skill.imageUrl}
                                    alt={`Logo de ${skill.name}`}
                                    fill
                                    className='absolute top-0 left-0 w-full h-full object-contain'
                                    draggable={false}
                                />
                            </div>
                            <span className='text-center text-xl font-bold text-slate-100'>
                                {skill.name}
                            </span>
                            <span className='rounded-xl bg-slate-700 px-2 py-1 text-sm font-medium text-slate-100'>
                                {skill.category}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    key='deck'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='relative mx-auto h-[450px] w-[90vw] max-w-[350px]'>
                    {skills.length >= positions.length &&
                        positions.map((pos, i) => {
                            const skill = getSkillAt(i);
                            return (
                                <Card
                                    key={skill._id}
                                    position={pos}
                                    handleShuffle={handleShuffle}
                                    imgUrl={skill.imageUrl}
                                    name={skill.name}
                                    title={skill.title}
                                    category={skill.category}
                                    isMobile={isMobile}
                                />
                            );
                        })}
                </motion.div>
            )}
        </div>
    );
};

const Card = ({
    handleShuffle,
    position,
    imgUrl,
    name,
    title,
    category,
    isMobile,
}) => {
    const mousePosRef = useRef(0);

    const onDragStart = (e) => {
        mousePosRef.current = e.clientX;
    };

    const onDragEnd = (e) => {
        const diff = mousePosRef.current - e.clientX;
        if (diff > 150) {
            handleShuffle();
        }
        mousePosRef.current = 0;
    };

    const x = isMobile
        ? position === 'front'
            ? '0%'
            : position === 'middle'
            ? '10%'
            : '20%'
        : position === 'front'
        ? '0%'
        : position === 'middle'
        ? '33%'
        : '66%';

    const rotateZ = isMobile
        ? '0deg'
        : position === 'front'
        ? '-6deg'
        : position === 'middle'
        ? '0deg'
        : '6deg';

    const scale = isMobile
        ? position === 'front'
            ? 1
            : position === 'middle'
            ? 0.94
            : 0.88
        : position === 'front'
        ? 1
        : position === 'middle'
        ? 1
        : 0.95;

    const opacity = 1;

    const zIndex =
        position === 'front' ? '2' : position === 'middle' ? '1' : '0';

    const draggable = position === 'front';

    return (
        <motion.div
            style={{ zIndex }}
            animate={{ rotate: rotateZ, x, scale, opacity }}
            drag
            dragElastic={0.35}
            dragListener={draggable}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            transition={{ duration: 0.35 }}
            className={`absolute inset-0 mx-auto grid h-[450px] w-[90%] max-w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-customDarkGray p-6 shadow-xl backdrop-blur-md ${
                draggable ? 'cursor-grab active:cursor-grabbing' : ''
            }`}>
            <div className='relative h-32 w-32'>
                <Image
                    src={imgUrl}
                    alt={`Logo de ${name}`}
                    fill
                    className='absolute top-0 left-0 w-full h-full object-contain'
                    draggable={false}
                />
            </div>
            <span className='text-center text-xl font-bold text-slate-100'>
                {name}
            </span>
            <span className='absolute top-1 right-6 rounded-xl bg-slate-700 px-2 py-1 text-sm font-medium text-slate-100'>
                {category}
            </span>
        </motion.div>
    );
};

export default ShuffleCards;
