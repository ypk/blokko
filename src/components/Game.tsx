import { useCallback, useEffect } from 'react';
import { useHints } from '../hooks/useHints';
import { useInactivityTimer } from '../hooks/useInactivityTimer';
import { useGameLogic } from '../hooks/useGameLogic';
import { getStatusClass } from '../utils/game';
import type { Screen } from '../types/Screen';
import Grid from './Grid';
import Head from './Head';
import blokkoLogo from '../img/blokko.png';

interface GameProps {
  onNavigate: (screen: Screen, finalScore?: number) => void;
}

const Game = ({ onNavigate }: GameProps) => {
  const { gameState, handleCellClick, resetGame, gridSize } = useGameLogic();
  
  const { hintCells, showingHints, startHintMechanism, stopHintMechanism } = useHints(
    gameState.grid, 
    gameState.gameStatus
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

  // Handle game end navigation
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      setTimeout(() => {
        onNavigate('victory', gameState.moveCount);
      }, 1500); // Small delay to show the win state
    } else if (gameState.gameStatus === 'lost') {
      setTimeout(() => {
        onNavigate('gameover', gameState.moveCount);
      }, 1500); // Small delay to show the loss state
    }
  }, [gameState.gameStatus, gameState.moveCount, onNavigate]);

  return (
    <>
      <Head 
        gameStatus={gameState.gameStatus}
        moveCount={gameState.moveCount}
      />

      <div className="game-container">
        <div className="game-header">
          <button
            onClick={() => onNavigate('menu')}
            className="back-button"
          >
            ← Menu
          </button>
          
          <button
            onClick={onResetGame}
            className="reset-button"
          >
            Reset
          </button>
        </div>

        <div className="game-content">
          <div className="game-logo-container">
            <img 
              src={blokkoLogo} 
              alt="Blokko" 
              className="game-logo"
            />
          </div>

          <Grid 
            grid={gameState.grid} 
            onCellClick={onCellClick}
            hintCells={hintCells}
            gridSize={gridSize}
          />

        </div>

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
        </div>
      </div>
    </>
  );
};

export default Game;
