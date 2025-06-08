import type { Cell } from "../types/Cell";
import type { Position } from "../types/Position";
import { generateRandomNumber } from "./random";

export const createInitialGrid = (): Cell[][] => {
    const grid: Cell[][] = [];

    for (let row = 0; row < 10; row++) {
        const gridRow: Cell[] = [];
        for (let col = 0; col < 10; col++) {
            gridRow.push({
                id: `${row}-${col}`,
                value: generateRandomNumber(),
                row,
                col,
                isSelected: false,
            });
        }
        grid.push(gridRow);
    }

    return grid;
};

export const areAdjacent = (pos1: Position, pos2: Position): boolean => {
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

export const canMatch = (num1: number, num2: number): boolean => {
    return num1 === num2 || num1 + num2 === 10;
};