import { useState, useRef, useCallback } from 'react';
import type { Cell } from '../types/Cell';
import { getContextualHints } from '../utils/contextualHints';

const HINT_DISPLAY_DURATION = 10000; // Show hint for 10 seconds then stop

export const useHints = (grid: Cell[][], gameStatus: string, selectedCells: Cell[] = []) => {
  const [hintCells, setHintCells] = useState<Cell[]>([]);
  const [showingHints, setShowingHints] = useState<boolean>(false);
  const hintTimer = useRef<NodeJS.Timeout | null>(null);
  const currentGridRef = useRef(grid);
  const gameStatusRef = useRef(gameStatus);
  const selectedCellsRef = useRef(selectedCells);
  
  // Update refs
  currentGridRef.current = grid;
  gameStatusRef.current = gameStatus;
  selectedCellsRef.current = selectedCells;

  const stopHintMechanism = useCallback(() => {
    setShowingHints(false);
    setHintCells([]);
    if (hintTimer.current) {
      clearTimeout(hintTimer.current);
      hintTimer.current = null;
    }
  }, []);

  const startHintMechanism = useCallback(() => {
    if (gameStatusRef.current !== 'playing' || showingHints) return;
    
    // Fix the parameter order: selectedCells first, then grid
    const matchingPair = getContextualHints(selectedCellsRef.current, currentGridRef.current);
    if (matchingPair.length > 0) {
      setShowingHints(true);
      setHintCells(matchingPair);
      
      // Show hint for 10 seconds then stop (no cycling)
      hintTimer.current = setTimeout(() => {
        stopHintMechanism();
      }, HINT_DISPLAY_DURATION);
    }
  }, [stopHintMechanism, showingHints]);

  return {
    hintCells,
    showingHints,
    startHintMechanism,
    stopHintMechanism
  };
};
