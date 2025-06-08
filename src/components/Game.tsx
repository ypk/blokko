import { useState } from 'react';
import type { Cell as CellType } from '../types/Cell';
import type { State as GameState } from '../types/State';
import { createInitialGrid } from '../utils/grid';
import Grid from './Grid';  

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    grid: createInitialGrid(),
    selectedCells: [],
    gameStatus: 'playing',
    moveCount: 0,
  }));

  const handleCellClick = (cell: CellType) => {
    if (gameState.gameStatus !== 'playing' || cell.value === null) {
      return;
    }

    console.log('Cell clicked:', cell);
  };

  return (
    <div className="game-container">
      <h1>Blokko</h1>
      <div className="game-info">
        <p>Status: {gameState.gameStatus}</p>
        <p>Moves: {gameState.moveCount}</p>
      </div>
      <Grid 
        grid={gameState.grid} 
        onCellClick={handleCellClick}
      />
    </div>
  );
};

export default Game;
