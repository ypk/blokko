import { useState, useCallback } from 'react';
import type { State as GameState } from '../types/State';
import type { Cell } from '../types/Cell';
import { createInitialGrid, isValidSimpleSelection, updateGridSelection } from '../utils/grid';
import { processMatch } from '../utils/game';
import { useGridSize } from './useGridSize';
import { GAME_STATUS } from '../constants';

export const useGameLogic = () => {
    const gridSize = useGridSize();
    
    const [gameState, setGameState] = useState<GameState>(() => ({
        grid: createInitialGrid(gridSize),
        selectedCells: [],
        gameStatus: GAME_STATUS.PLAYING,
        moveCount: 0,
    }));

    const handleCellClick = useCallback((clickedCell: Cell) => {
        if (gameState.gameStatus !== GAME_STATUS.PLAYING || clickedCell.value === null) {
            return;
        }

        setGameState(prevState => {
            const { selectedCells, grid } = prevState;
            const existingIndex = selectedCells.findIndex(cell => cell.id === clickedCell.id);
            
            if (existingIndex !== -1) {
                const newSelectedCells = selectedCells.slice(0, existingIndex);
                return {
                    ...prevState,
                    selectedCells: newSelectedCells,
                    grid: updateGridSelection(grid, newSelectedCells)
                };
            }

            const newSelectedCells = [...selectedCells, clickedCell];

            if (isValidSimpleSelection(newSelectedCells)) {
                return processMatch(prevState, newSelectedCells);
            } else if (newSelectedCells.length === 1) {
                return {
                    ...prevState,
                    selectedCells: newSelectedCells,
                    grid: updateGridSelection(grid, newSelectedCells)
                };
            } else {
                return {
                    ...prevState,
                    selectedCells: [clickedCell],
                    grid: updateGridSelection(grid, [clickedCell])
                };
            }
        });
    }, [gameState.gameStatus]);

    const resetGame = useCallback(() => {
        setGameState({
            grid: createInitialGrid(gridSize),
            selectedCells: [],
            gameStatus: GAME_STATUS.PLAYING,
            moveCount: 0,
        });
    }, [gridSize]);

    return {
        gameState,
        handleCellClick,
        resetGame,
        gridSize
    };
};
