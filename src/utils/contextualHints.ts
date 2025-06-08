import type { Cell } from '../types/Cell';
import { canMatch, areAdjacent } from './grid';

/**
 * Find adjacent cells that can match with the given cell
 */
export const findAdjacentMatches = (targetCell: Cell, grid: Cell[][]): Cell[] => {
    const allCells = grid.flat().filter(cell => cell.value !== null && cell.id !== targetCell.id);
    
    return allCells.filter(cell => 
        areAdjacent(targetCell, cell) && canMatch(targetCell.value!, cell.value!)
    );
};

/**
 * Find any possible matches on the board (fallback when no adjacent matches)
 */
export const findAnyMatches = (grid: Cell[][], excludeIds: string[] = []): Cell[] => {
    const allCells = grid.flat().filter(cell => 
        cell.value !== null && !excludeIds.includes(cell.id)
    );
    
    for (let i = 0; i < allCells.length; i++) {
        for (let j = i + 1; j < allCells.length; j++) {
            const cell1 = allCells[i];
            const cell2 = allCells[j];
            
            if (canMatch(cell1.value!, cell2.value!) && areAdjacent(cell1, cell2)) {
                return [cell1, cell2];
            }
        }
    }
    
    for (let i = 0; i < allCells.length; i++) {
        for (let j = i + 1; j < allCells.length; j++) {
            const cell1 = allCells[i];
            const cell2 = allCells[j];
            
            if (canMatch(cell1.value!, cell2.value!)) {
                return [cell1, cell2];
            }
        }
    }
    
    return [];
};

/**
 * Get contextual hints based on current selection
 */
export const getContextualHints = (selectedCells: Cell[], grid: Cell[][]): Cell[] => {
    if (selectedCells.length === 1) {
        const selectedCell = selectedCells[0];
        const adjacentMatches = findAdjacentMatches(selectedCell, grid);

        if (adjacentMatches.length > 0) {
            return adjacentMatches;
        }
        
        const otherMatches = findAnyMatches(grid, [selectedCell.id]);
        return otherMatches;
    }
    
    const excludeIds = selectedCells.map(cell => cell.id);
    return findAnyMatches(grid, excludeIds);
};
