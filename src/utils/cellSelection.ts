import type { Cell } from '../types/Cell';

export const findCellIndex = (cells: Cell[], targetCell: Cell): number => {
    return cells.findIndex(cell => cell.id === targetCell.id);
};

export const isCellSelected = (selectedCells: Cell[], targetCell: Cell): boolean => {
    return selectedCells.some(cell => cell.id === targetCell.id);
};

export const canSelectCell = (cell: Cell, gameStatus: string): boolean => {
    return gameStatus === 'playing' && cell.value !== null;
};
