import type { Cell } from "./Cell";
export interface GameState {
    grid: Cell[][];
    selectedCells: Cell[];
    gameStatus: 'playing' | 'won' | 'lost';
    moveCount: number;
}
