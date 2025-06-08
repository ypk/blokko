import { useState, useRef, useCallback, useEffect } from 'react';

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
    console.log('🛑 Inactivity timer stopped');
  }, []);

  const startInactivityTimer = useCallback(() => {
    if (timerRunning || gameStatus !== 'playing' || showingHints) {
      console.log('⏰ Timer not started - conditions:', { timerRunning, gameStatus, showingHints });
      return;
    }

    setTimerRunning(true);
    
    // Determine timeout based on selection state
    const timeout = selectedCellsCount === 1 ? SINGLE_CELL_TIMEOUT : NO_SELECTION_TIMEOUT;
    
    console.log(`⏰ Starting inactivity timer: ${timeout/1000}s (${selectedCellsCount === 1 ? 'single cell' : 'no selection'})`);
    
    inactivityTimer.current = setTimeout(() => {
      const timeSinceLastClick = Date.now() - lastClickTime;
      const requiredTimeout = selectedCellsCount === 1 ? SINGLE_CELL_TIMEOUT : NO_SELECTION_TIMEOUT;
      
      console.log('⏰ Timer fired - time since last click:', timeSinceLastClick, 'required:', requiredTimeout);
      
      if (timeSinceLastClick >= requiredTimeout && !showingHints) {
        console.log('🎯 Triggering hint mechanism');
        onInactivityRef.current();
      }
      setTimerRunning(false);
    }, timeout);
  }, [timerRunning, gameStatus, selectedCellsCount, lastClickTime, showingHints]);

  const resetTimer = useCallback(() => {
    const newTime = Date.now();
    setLastClickTime(newTime);
    stopInactivityTimer();
    
    console.log('🔄 Timer reset');
    
    // Restart timer after a brief delay
    setTimeout(() => {
      if (gameStatus === 'playing' && !showingHints) {
        startInactivityTimer();
      }
    }, 100);
  }, [gameStatus, showingHints, stopInactivityTimer, startInactivityTimer]);

  // Effect for managing timer lifecycle
  useEffect(() => {
    if (gameStatus !== 'playing' || showingHints) {
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
