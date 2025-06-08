import type { Cell } from '../types/Cell';
import type { State as GameState } from '../types/State';
import { isGameWon, hasValidMoves } from './grid';

export const processMatch = (currentState: GameState, selectedCells: Cell[]): GameState => {
    const newGrid = [...currentState.grid];

    selectedCells.forEach(selectedCell => {
        newGrid[selectedCell.row][selectedCell.col] = {
            ...newGrid[selectedCell.row][selectedCell.col],
            value: null,
            isSelected: false
        };
    });

    let newStatus: GameState['gameStatus'] = 'playing';
    if (isGameWon(newGrid)) {
        newStatus = 'won';
    } else if (!hasValidMoves(newGrid)) {
        newStatus = 'lost';
    }

    return {
        ...currentState,
        grid: newGrid,
        selectedCells: [],
        moveCount: currentState.moveCount + 1,
        gameStatus: newStatus
    };
};

export const getStatusClass = (gameStatus: GameState['gameStatus']): string => {
    switch (gameStatus) {
        case 'playing':
            return 'status-playing';
        case 'won':
            return 'status-won';
        case 'lost':
            return 'status-lost';
        default:
            return 'status-playing';
    }
};
