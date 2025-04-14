'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from 'motion/react';

export const AnimatedTooltip = ({ items }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);

    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig,
    );

    const handleMouseMove = (event) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    return (
        <>
            {items.map((item) => (
                <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className='group -mr-3'
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    {/* Ce conteneur est clé pour le bon positionnement */}
                    <div className='relative flex flex-col items-center'>
                        <AnimatePresence mode='popLayout'>
                            {hoveredIndex === item.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            type: 'spring',
                                            stiffness: 260,
                                            damping: 10,
                                        },
                                    }}
                                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                    style={{
                                        rotate: rotate,
                                        whiteSpace: 'nowrap',
                                    }}
                                    className='absolute -top-16 z-50 flex flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl'>
                                    <div className='absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent' />
                                    <div className='absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent' />
                                    <div className='relative z-30 text-base font-bold text-white'>
                                        {item.name}
                                    </div>
                                    <div className='text-xs text-white'>
                                        {item.designation}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            className='relative h-10 w-10 md:h-14 md:w-14 rounded-full border-2 border-white transition duration-500 group-hover:z-30 group-hover:scale-105 bg-customGrayTags hover:cursor-default'
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}>
                            <Image
                                onMouseMove={handleMouseMove}
                                fill
                                src={item.image}
                                alt={`Logo de ${item.name}`}
                                className='m-0 absolute top-0 left-0 h-full w-full object-contain p-2'
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
