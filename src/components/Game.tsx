import { useState } from 'react';
import type { State as GameState } from '../types/State';
import type { Cell } from '../types/Cell';
import { createInitialGrid } from '../utils/grid';
import Grid from './Grid';
import Head from './Head';

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    grid: createInitialGrid(),
    selectedCells: [],
    gameStatus: 'playing',
    moveCount: 0,
  }));

  const handleCellClick = (cell: Cell) => {
    if (gameState.gameStatus !== 'playing' || cell.value === null) {
      return;
    }
    console.log('Cell clicked:', cell);
  };

  const getStatusClass = () => {
    switch (gameState.gameStatus) {
      case 'playing':
        return 'status-playing';
      case 'won':
        return 'status-won';
      case 'lost':
        return 'status-lost';
      default:
        return 'status-playing';
    }
  };

  return (
    <>
      <Head 
        gameStatus={gameState.gameStatus}
        moveCount={gameState.moveCount}
      />

      <div className="game-container">
        <div className="game-content">
          <h1 className="game-title">
            Blokko
          </h1>
          
          <div className="game-stats">
            <div className="stat-card">
              <span className="stat-label">Status:</span>
              <span className={`stat-value ${getStatusClass()}`}>
                {gameState.gameStatus.toUpperCase()}
              </span>
            </div>
            
            <div className="stat-card">
              <span className="stat-label">Moves:</span>
              <span className="stat-value move-count">
                {gameState.moveCount}
              </span>
            </div>
          </div>

          <Grid 
            grid={gameState.grid} 
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    </>
  );
};

export default Game;