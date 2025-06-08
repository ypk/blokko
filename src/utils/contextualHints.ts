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
    
    // Try to find matching pairs that are adjacent first
    for (let i = 0; i < allCells.length; i++) {
        for (let j = i + 1; j < allCells.length; j++) {
            const cell1 = allCells[i];
            const cell2 = allCells[j];
            
            if (canMatch(cell1.value!, cell2.value!) && areAdjacent(cell1, cell2)) {
                return [cell1, cell2];
            }
        }
    }
    
    // If no adjacent pairs, try to find any matching pairs
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
    // If one cell is selected, look for adjacent matches first
    if (selectedCells.length === 1) {
        const selectedCell = selectedCells[0];
        const adjacentMatches = findAdjacentMatches(selectedCell, grid);
        
        console.log(`🎯 Selected cell ${selectedCell.id} (value: ${selectedCell.value})`);
        console.log(`🔍 Found ${adjacentMatches.length} adjacent matches:`, adjacentMatches.map(c => `${c.id}(${c.value})`));
        
        if (adjacentMatches.length > 0) {
            return adjacentMatches;
        }
        
        // If no adjacent matches, find other possible matches
        console.log('❌ No adjacent matches, looking for other hints...');
        const otherMatches = findAnyMatches(grid, [selectedCell.id]);
        console.log(`🔍 Found ${otherMatches.length} other matches:`, otherMatches.map(c => `${c.id}(${c.value})`));
        return otherMatches;
    }
    
    // If no cells selected or multiple cells selected, show any available matches
    const excludeIds = selectedCells.map(cell => cell.id);
    return findAnyMatches(grid, excludeIds);
};
