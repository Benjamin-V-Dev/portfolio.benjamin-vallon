// components/ClientLoader.js
'use client'; // Ce composant sera côté client

import { useState, useEffect } from 'react';
import Loader from '@/components/Loader/Loader'; // Ton loader

export default function ClientLoader({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Masquer le loader après 5 secondes

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && <Loader />}
            {!loading && children}
        </>
    );
}
