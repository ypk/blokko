import { useState, useEffect } from 'react';
import { GRID_SIZE } from '../constants';

export const useGridSize = () => {
    const [gridSize, setGridSize] = useState(() => {
        if (typeof window !== 'undefined') {
            const screenSize = Math.min(window.innerWidth, window.innerHeight);
            if (screenSize < 640) return GRID_SIZE.SMALL;      // Mobile: 6x6
            if (screenSize < 1024) return GRID_SIZE.MEDIUM;    // Tablet: 8x8
            return GRID_SIZE.LARGE;                            // Desktop: 10x10
        }
        return GRID_SIZE.SMALL;
    });

    useEffect(() => {
        const updateGridSize = () => {
            const screenSize = Math.min(window.innerWidth, window.innerHeight);
            if (screenSize < 640) {
                setGridSize(GRID_SIZE.SMALL);    // Mobile: 6x6
            } else if (screenSize < 1024) {
                setGridSize(GRID_SIZE.MEDIUM);   // Tablet: 8x8
            } else {
                setGridSize(GRID_SIZE.LARGE);    // Desktop: 10x10
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
