import React, { useCallback } from 'react';
import { useHints } from '../hooks/useHints';
import { useInactivityTimer } from '../hooks/useInactivityTimer';
import { useGameLogic } from '../hooks/useGameLogic';
import { getStatusClass } from '../utils/game';
import Grid from './Grid';
import Head from './Head';
import blokkoLogo from '../img/blokko.png';

const Game = () => {
  const { gameState, handleCellClick, resetGame } = useGameLogic();
  
  // Pass selectedCells to useHints for contextual hints
  const { hintCells, showingHints, startHintMechanism, stopHintMechanism } = useHints(
    gameState.grid, 
    gameState.gameStatus,
    gameState.selectedCells  // Add this line
  );
  
  // Create stable callback for inactivity
  const onInactivity = useCallback(() => {
    startHintMechanism();
  }, [startHintMechanism]);
  
  const { resetTimer } = useInactivityTimer(
    gameState.gameStatus,
    gameState.selectedCells.length,
    showingHints,
    onInactivity
  );

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
          <div className="game-logo-container">
            <img 
              src={blokkoLogo} 
              alt="Blokko" 
              className="game-logo"
            />
          </div>

          {(gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') && (
            <div className="flex justify-center mb-8">
              <button
                onClick={onResetGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                {gameState.gameStatus === 'won' ? 'Play Again! 🎉' : 'Try Again'}
              </button>
            </div>
          )}

          <Grid 
            grid={gameState.grid} 
            onCellClick={onCellClick}
            hintCells={hintCells}
          />
        </div>

        {/* Bottom left corner stats - transparent */}
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
          
          {/* Debug info - remove in production */}
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

export default Game;
