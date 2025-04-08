'use client';
import React from 'react';
import { AnimatedTooltip } from '../UI/animated-tooltip';

export function Tags({ tags }) {
    // 🔤 Trie les tags par ordre alphabétique (insensible à la casse)
    const sortedTags = [...tags].sort((a, b) =>
        a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }),
    );

    // On transforme les tags pour qu'ils correspondent à l’API attendue par AnimatedTooltip
    const items = sortedTags.map((tag, index) => ({
        id: index,
        name: tag.name,
        designation: tag.category || '',
        image: tag.imageUrl,
    }));

    return (
        <div
            className='flex flex-row items-center justify-start w-full'
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}>
            <AnimatedTooltip items={items} />
        </div>
    );
}
