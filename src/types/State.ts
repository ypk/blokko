import type { Cell } from "./Cell";
export interface State {
    grid: Cell[][];
    selectedCells: Cell[];
    gameStatus: 'playing' | 'won' | 'lost';
    moveCount: number;
}
