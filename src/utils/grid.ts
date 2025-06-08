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

// Updated to include diagonal adjacency (8-directional)
export const areAdjacent = (pos1: Position, pos2: Position): boolean => {
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);

    // Allow horizontal, vertical, and diagonal adjacency
    return (rowDiff === 1 && colDiff === 0) || // Vertical
           (rowDiff === 0 && colDiff === 1) || // Horizontal  
           (rowDiff === 1 && colDiff === 1);   // Diagonal
};

export const canMatch = (num1: number, num2: number): boolean => {
    return num1 === num2 || num1 + num2 === 10;
};

export const isValidSimpleSelection = (selectedCells: Cell[]): boolean => {
    if (selectedCells.length !== 2) {
        return false;
    }

    const [cell1, cell2] = selectedCells;
    
    if (cell1.value === null || cell2.value === null) {
        return false;
    }
    
    if (!canMatch(cell1.value, cell2.value)) {
        return false;
    }
    
    return areAdjacent(cell1, cell2);
};

export const hasValidMoves = (grid: Cell[][]): boolean => {
    const allCells = grid.flat().filter(cell => cell.value !== null);
    
    for (let i = 0; i < allCells.length; i++) {
        for (let j = i + 1; j < allCells.length; j++) {
            const cell1 = allCells[i];
            const cell2 = allCells[j];
            
            if (canMatch(cell1.value!, cell2.value!) && areAdjacent(cell1, cell2)) {
                return true;
            }
        }
    }
    
    return false;
};

export const isGameWon = (grid: Cell[][]): boolean => {
    return grid.flat().every(cell => cell.value === null);
};

export const updateGridSelection = (grid: Cell[][], selectedCells: Cell[]): Cell[][] => {
    return grid.map(row =>
        row.map(cell => ({
            ...cell,
            isSelected: selectedCells.some(selected => selected.id === cell.id)
        }))
    );
};