import { useState, useCallback } from 'react';
import type { State as GameState } from '../types/State';
import { createInitialGrid } from '../utils/grid';

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(() => ({
        grid: createInitialGrid(),
        selectedCells: [],
        gameStatus: 'playing',
        moveCount: 0,
    }));

    const resetGame = useCallback(() => {
        setGameState({
            grid: createInitialGrid(),
            selectedCells: [],
            gameStatus: 'playing',
            moveCount: 0,
        });
    }, []);

    return {
        gameState,
        setGameState,
        resetGame
    };
};
