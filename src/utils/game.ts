import type { Cell } from '../types/Cell';
import type { State as GameState } from '../types/State';
import { isGameWon, hasValidMoves } from './grid';
import { GAME_STATUS } from '../constants';

export const processMatch = (currentState: GameState, selectedCells: Cell[]): GameState => {
    const newGrid = [...currentState.grid];

    selectedCells.forEach(selectedCell => {
        newGrid[selectedCell.row][selectedCell.col] = {
            ...newGrid[selectedCell.row][selectedCell.col],
            value: null,
            isSelected: false
        };
    });

    let newStatus: GameState['gameStatus'] = GAME_STATUS.PLAYING;
    if (isGameWon(newGrid)) {
        newStatus = GAME_STATUS.WON;
    } else if (!hasValidMoves(newGrid)) {
        newStatus = GAME_STATUS.LOST;
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
        case GAME_STATUS.PLAYING:
            return 'status-playing';
        case GAME_STATUS.WON:
            return 'status-won';
        case GAME_STATUS.LOST:
            return 'status-lost';
        default:
            return 'status-playing';
    }
};
