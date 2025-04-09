'use client';
import React from 'react';
import { AnimatedTooltip } from '../UI/animated-tooltip';

export function Tags({ tags }) {
    // Suppression du tri local, on considère que les tags sont déjà triés par l’API
    const items = tags.map((tag, index) => ({
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
