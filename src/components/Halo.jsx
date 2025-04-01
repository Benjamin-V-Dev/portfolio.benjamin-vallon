'use client';
import { useEffect, useState } from 'react';

export default function Halo() {
    // État pour la position du halo
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        // Initialiser la position au centre de l'écran après le montage
        const initPosition = () => {
            setPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
        };

        // Gestionnaire de mouvement de souris
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        // Gestionnaire quand la souris quitte la fenêtre
        const handleMouseLeave = () => {
            setPosition({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
        };

        // Ajouter les écouteurs
        initPosition();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div>
            <div
                className='halo'
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}></div>
        </div>
    );
}
