import { useState, useRef, useCallback } from 'react';
import type { Cell } from '../types/Cell';
import { getContextualHints } from '../utils/contextualHints';

const HINT_DISPLAY_DURATION = 10000; // Show hint for 10 seconds then stop

export const useHints = (grid: Cell[][], gameStatus: string, selectedCells: Cell[] = []) => {
  const [hintCells, setHintCells] = useState<Cell[]>([]);
  const [showingHints, setShowingHints] = useState<boolean>(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentGridRef = useRef(grid);
  const gameStatusRef = useRef(gameStatus);
  const selectedCellsRef = useRef(selectedCells);
  
  // Update refs
  currentGridRef.current = grid;
  gameStatusRef.current = gameStatus;
  selectedCellsRef.current = selectedCells;

  const stopHintMechanism = useCallback(() => {
    console.log('🛑 Stopping hint mechanism');
    setShowingHints(false);
    setHintCells([]);
    if (hintTimer.current) {
      clearTimeout(hintTimer.current);
      hintTimer.current = null;
    }
  }, []);

  const startHintMechanism = useCallback(() => {
    console.log('🚀 Starting contextual hint mechanism - status:', gameStatusRef.current, 'already showing:', showingHints);
    console.log('🎯 Selected cells:', selectedCellsRef.current.map(c => `${c.id}(${c.value})`));
    
    if (gameStatusRef.current !== 'playing' || showingHints) return;
    
    const hints = getContextualHints(selectedCellsRef.current, currentGridRef.current);
    
    if (hints.length > 0) {
      console.log('✨ Displaying contextual hints for cells:', hints.map(c => `${c.id}(${c.value})`));
      setShowingHints(true);
      setHintCells(hints);
      
      // Show hint for 10 seconds then stop
      hintTimer.current = setTimeout(() => {
        console.log('⏰ Hint timeout reached, stopping hints');
        stopHintMechanism();
      }, HINT_DISPLAY_DURATION);
    } else {
      console.log('❌ No contextual hints found');
    }
  }, [stopHintMechanism, showingHints]);

  return {
    hintCells,
    showingHints,
    startHintMechanism,
    stopHintMechanism
  };
};