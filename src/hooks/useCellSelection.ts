import { useCallback } from 'react';
import type { Cell } from '../types/Cell';
import type { State as GameState } from '../types/State';
import { isValidSimpleSelection, updateGridSelection } from '../utils/grid';
import { processMatch } from '../utils/game';

export const useCellSelection = (
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    const handleExistingCellClick = useCallback((
        clickedCell: Cell,
        selectedCells: Cell[],
        grid: Cell[][]
    ) => {
        const existingIndex = selectedCells.findIndex(cell => cell.id === clickedCell.id);
        const newSelectedCells = selectedCells.slice(0, existingIndex);
        
        return {
            ...gameState,
            selectedCells: newSelectedCells,
            grid: updateGridSelection(grid, newSelectedCells)
        };
    }, [gameState]);

    const handleNewCellSelection = useCallback((
        clickedCell: Cell,
        selectedCells: Cell[],
        grid: Cell[][]
    ) => {
        const newSelectedCells = [...selectedCells, clickedCell];

        if (isValidSimpleSelection(newSelectedCells)) {
            return processMatch(gameState, newSelectedCells);
        } else if (newSelectedCells.length === 1) {
            return {
                ...gameState,
                selectedCells: newSelectedCells,
                grid: updateGridSelection(grid, newSelectedCells)
            };
        } else {
            return {
                ...gameState,
                selectedCells: [clickedCell],
                grid: updateGridSelection(grid, [clickedCell])
            };
        }
    }, [gameState]);

    const handleCellClick = useCallback((clickedCell: Cell) => {
        if (gameState.gameStatus !== 'playing' || clickedCell.value === null) {
            return;
        }

        setGameState(prevState => {
            const { selectedCells, grid } = prevState;
            const existingIndex = selectedCells.findIndex(cell => cell.id === clickedCell.id);

            if (existingIndex !== -1) {
                return handleExistingCellClick(clickedCell, selectedCells, grid);
            } else {
                return handleNewCellSelection(clickedCell, selectedCells, grid);
            }
        });
    }, [gameState.gameStatus, handleExistingCellClick, handleNewCellSelection, setGameState]);

    return {
        handleCellClick
    };
};
