// components/Loader.js
'use client'; // Ce composant est côté client car il utilise des hooks

import { useState } from 'react';

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='loaderHome rounded-full h-16 w-16 border-t-4 border-customBlue'></div>
        </div>
    );
}
