import { useState, useRef, useCallback, useEffect } from 'react';
import { GAME_STATUS } from '../constants';

const SINGLE_CELL_TIMEOUT = 30000; // 30 seconds when one cell selected
const NO_SELECTION_TIMEOUT = 60000; // 60 seconds when no cells selected

export const useInactivityTimer = (
  gameStatus: string,
  selectedCellsCount: number,
  showingHints: boolean,
  onInactivity: () => void
) => {
  const [lastClickTime, setLastClickTime] = useState<number>(Date.now());
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Use ref to store the callback to avoid dependency issues
  const onInactivityRef = useRef(onInactivity);
  onInactivityRef.current = onInactivity;

  const stopInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
    setTimerRunning(false);
  }, []);

  const startInactivityTimer = useCallback(() => {
    if (timerRunning || gameStatus !== GAME_STATUS.PLAYING || showingHints) {
      return;
    }

    setTimerRunning(true);
    
    // Determine timeout based on selection state
    const timeout = selectedCellsCount === 1 ? SINGLE_CELL_TIMEOUT : NO_SELECTION_TIMEOUT;
    
    inactivityTimer.current = setTimeout(() => {
      const timeSinceLastClick = Date.now() - lastClickTime;
      const requiredTimeout = selectedCellsCount === 1 ? SINGLE_CELL_TIMEOUT : NO_SELECTION_TIMEOUT;
      
      if (timeSinceLastClick >= requiredTimeout && !showingHints) {
        onInactivityRef.current();
      }
      setTimerRunning(false);
    }, timeout);
  }, [timerRunning, gameStatus, selectedCellsCount, lastClickTime, showingHints]);

  const resetTimer = useCallback(() => {
    const newTime = Date.now();
    setLastClickTime(newTime);
    stopInactivityTimer();
    
    // Restart timer after a brief delay
    setTimeout(() => {
      if (gameStatus === GAME_STATUS.PLAYING && !showingHints) {
        startInactivityTimer();
      }
    }, 100);
  }, [gameStatus, showingHints, stopInactivityTimer, startInactivityTimer]);

  // Effect for managing timer lifecycle
  useEffect(() => {
    if (gameStatus !== GAME_STATUS.PLAYING || showingHints) {
      stopInactivityTimer();
      return;
    }

    // Start timer when conditions are right
    if (!timerRunning) {
      const timeoutId = setTimeout(() => {
        startInactivityTimer();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [gameStatus, showingHints, timerRunning, selectedCellsCount]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      stopInactivityTimer();
    };
  }, [stopInactivityTimer]);

  return {
    resetTimer,
    lastClickTime
  };
};
