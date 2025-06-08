import { useState, useRef, useCallback, useEffect } from 'react';
import { GAME_STATUS } from '../constants';
import { SINGLE_CELL_TIMEOUT, NO_SELECTION_TIMEOUT } from '../constants';

export const useInactivityTimer = (
  gameStatus: string,
  selectedCellsCount: number,
  showingHints: boolean,
  onInactivity: () => void
) => {
  const [lastClickTime, setLastClickTime] = useState<number>(Date.now());
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
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
    
    setTimeout(() => {
      if (gameStatus === GAME_STATUS.PLAYING && !showingHints) {
        startInactivityTimer();
      }
    }, 100);
  }, [gameStatus, showingHints, stopInactivityTimer, startInactivityTimer]);

  useEffect(() => {
    if (gameStatus !== GAME_STATUS.PLAYING || showingHints) {
      stopInactivityTimer();
      return;
    }

    if (!timerRunning) {
      const timeoutId = setTimeout(() => {
        startInactivityTimer();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [gameStatus, showingHints, timerRunning, selectedCellsCount]);

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