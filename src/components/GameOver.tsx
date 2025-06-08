import { Helmet } from 'react-helmet-async';
import type { Screen } from '../types/Screen';

interface GameOverProps {
  onNavigate: (screen: Screen) => void;
  finalScore?: number;
}

const GameOver = ({ onNavigate, finalScore = 0 }: GameOverProps) => {
  return (
    <>
      <Helmet>
        <title>Game Over - Blokko</title>
        <meta name="description" content="Game Over! Try again and beat your score in Blokko!" />
      </Helmet>

      <div className="gameover-screen">
        <div className="gameover-content">
          <h1 className="gameover-title">💔 GAME OVER</h1>
          
          <div className="gameover-message">
            <p>No more valid moves available!</p>
            <p>Better luck next time!</p>
          </div>
          
          <div className="score-card">
            <div className="score-number">{finalScore}</div>
            <div className="score-description">Final Score</div>
          </div>

          <div className="action-buttons">
            <button
              onClick={() => onNavigate('game')}
              className="action-button-primary"
            >
              TRY AGAIN
            </button>
            
            <button
              onClick={() => onNavigate('menu')}
              className="action-button-secondary"
            >
              MAIN MENU
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;
