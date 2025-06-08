import type { Cell } from '../types/Cell';

export const isCellHinted = (cell: Cell, hintCells: Cell[]): boolean => {
    return hintCells.some(hintCell => hintCell.id === cell.id);
};

export const cellsMatch = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.id === cell2.id;
};
