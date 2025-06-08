import React, { useCallback, useEffect } from 'react';
import { useHints } from '../hooks/useHints';
import { useInactivityTimer } from '../hooks/useInactivityTimer';
import { useGameLogic } from '../hooks/useGameLogic';  // Using your existing hook
import { useFlow } from '../context/FlowContext';
import { getStatusClass } from '../utils/game';
import Grid from '../components/Grid';
import Head from '../components/Head';
import blokkoLogo from '../img/blokko.png';

const Screen = () => {
  const { gameState, handleCellClick, resetGame } = useGameLogic();  // Using your hook
  const { navigateToScreen, setFinalScore } = useFlow();
  
  const { hintCells, showingHints, startHintMechanism, stopHintMechanism } = useHints(
    gameState.grid,
    gameState.gameStatus,
    gameState.selectedCells
  );
  
  const onInactivity = useCallback(() => {
    startHintMechanism();
  }, [startHintMechanism]);
  
  const { resetTimer } = useInactivityTimer(
    gameState.gameStatus,
    gameState.selectedCells.length,
    showingHints,
    onInactivity
  );

  // Handle game over/victory
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      setFinalScore(gameState.moveCount);
      navigateToScreen('victory');
    } else if (gameState.gameStatus === 'lost') {
      setFinalScore(gameState.moveCount);
      navigateToScreen('gameOver');
    }
  }, [gameState.gameStatus, gameState.moveCount, navigateToScreen, setFinalScore]);

  const onCellClick = useCallback((cell: any) => {
    resetTimer();
    stopHintMechanism();
    handleCellClick(cell);
  }, [resetTimer, stopHintMechanism, handleCellClick]);

  const onResetGame = useCallback(() => {
    resetGame();
    resetTimer();
    stopHintMechanism();
  }, [resetGame, resetTimer, stopHintMechanism]);

  return (
    <>
      <Head
        gameStatus={gameState.gameStatus}
        moveCount={gameState.moveCount}
      />

      <div className="game-container">
        <div className="game-content">
          <div className="game-header">
            <button
              onClick={() => navigateToScreen('menu')}
              className="back-button"
            >
              ← Menu
            </button>
            
            <div className="game-logo-container">
              <img
                src={blokkoLogo}
                alt="Blokko"
                className="game-logo"
              />
            </div>
            
            <button
              onClick={onResetGame}
              className="reset-button"
            >
              🔄 Reset
            </button>
          </div>

          <Grid
            grid={gameState.grid}
            onCellClick={onCellClick}
            hintCells={hintCells}
          />
        </div>

        {/* Bottom left corner stats */}
        <div className="bottom-stats">
          <div className="bottom-stat">
            <span className="stat-label">Status:</span>
            <span className={`stat-value ${getStatusClass(gameState.gameStatus)}`}>
              {gameState.gameStatus.toUpperCase()}
            </span>
          </div>
          
          <div className="bottom-stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value score-count">
              {gameState.moveCount}
            </span>
          </div>
          
          <div className="bottom-stat">
            <span className="stat-label">Selected:</span>
            <span className="stat-value">
              {gameState.selectedCells.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen;
