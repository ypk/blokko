import { useState, useRef, useCallback } from 'react';
import type { Cell } from '../types/Cell';
import { canMatch, areAdjacent } from '../utils/grid';
import { GAME_STATUS } from '../constants';
import { HINT_DISPLAY_DURATION } from '../constants';

export const useHints = (grid: Cell[][], gameStatus: string) => {
  const [hintCells, setHintCells] = useState<Cell[]>([]);
  const [showingHints, setShowingHints] = useState<boolean>(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentGridRef = useRef(grid);
  const gameStatusRef = useRef(gameStatus);
  
  currentGridRef.current = grid;
  gameStatusRef.current = gameStatus;

  const findValidMatch = useCallback((currentGrid: Cell[][]): Cell[] => {
    const allCells = currentGrid.flat().filter(cell => cell.value !== null);
    
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
  }, []);

  const stopHintMechanism = useCallback(() => {
    setShowingHints(false);
    setHintCells([]);
    if (hintTimer.current) {
      clearTimeout(hintTimer.current);
      hintTimer.current = null;
    }
  }, []);

  const startHintMechanism = useCallback(() => {
    if (gameStatusRef.current !== GAME_STATUS.PLAYING || showingHints) return;
    
    const matchingPair = findValidMatch(currentGridRef.current);
    if (matchingPair.length > 0) {
      setShowingHints(true);
      setHintCells(matchingPair);
      
      hintTimer.current = setTimeout(() => {
        stopHintMechanism();
      }, HINT_DISPLAY_DURATION);
    }
  }, [findValidMatch, stopHintMechanism, showingHints]);

  return {
    hintCells,
    showingHints,
    startHintMechanism,
    stopHintMechanism
  };
};