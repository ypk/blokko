import { useCallback, useEffect } from 'react';
import { useHints } from '../../hooks/useHints';
import { useInactivityTimer } from '../../hooks/useInactivityTimer';
import { useGameLogic } from '../../hooks/useGameLogic';
import { getStatusClass } from '../../utils/game';
import { SCREEN, GAME_STATUS } from '../../constants';
import type { Screen } from '../../types/Screen';
import Grid from '../Grid';
import Head from '../Head';
import blokkoLogo from '../../img/blokko.png';

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
    if (gameState.gameStatus === GAME_STATUS.WON) {
      setTimeout(() => {
        onNavigate(SCREEN.VICTORY, gameState.moveCount);
      }, 1500);
    } else if (gameState.gameStatus === GAME_STATUS.LOST) {
      setTimeout(() => {
        onNavigate(SCREEN.GAME_OVER, gameState.moveCount);
      }, 1500);
    }
  }, [gameState.gameStatus, gameState.moveCount, onNavigate]);

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

          <div className="game-header-with-score">
            <button
              onClick={() => onNavigate(SCREEN.MENU)}
              className="back-button"
            >
              ← Menu
            </button>
            
            <div className="score-display">
              <span className="score-label">Score</span>
              <span className="score-value">{gameState.moveCount}</span>
            </div>
            
            <button
              onClick={onResetGame}
              className="reset-button"
            >
              Reset
            </button>
          </div>

          <Grid 
            grid={gameState.grid} 
            onCellClick={onCellClick}
            hintCells={hintCells}
            gridSize={gridSize}
          />
        </div>
      </div>
    </>
  );
};

export default Game;
