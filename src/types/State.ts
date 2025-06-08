import type { Cell } from "./Cell";
import { GAME_STATUS } from '../constants';

export interface State {
    grid: Cell[][];
    selectedCells: Cell[];
    gameStatus: typeof GAME_STATUS[keyof typeof GAME_STATUS];
    moveCount: number;
}
