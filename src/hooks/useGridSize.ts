import { useState, useEffect } from 'react';

export const useGridSize = () => {
    const [gridSize, setGridSize] = useState(() => {
        if (typeof window !== 'undefined') {
            const screenSize = Math.min(window.innerWidth, window.innerHeight);
            if (screenSize < 769) return 6;  // Mobile + Tablet: 6x6
            return 10;                       // Desktop: 10x10
        }
        return 6;
    });

    useEffect(() => {
        const updateGridSize = () => {
            const screenSize = Math.min(window.innerWidth, window.innerHeight);
            if (screenSize < 769) {
                setGridSize(6);   // Mobile + Tablet: 6x6
            } else {
                setGridSize(10);  // Desktop: 10x10
            }
        };

        window.addEventListener('resize', updateGridSize);
        window.addEventListener('orientationchange', updateGridSize);
        
        return () => {
            window.removeEventListener('resize', updateGridSize);
            window.removeEventListener('orientationchange', updateGridSize);
        };
    }, []);

    return gridSize;
};
