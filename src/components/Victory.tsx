import { Helmet } from 'react-helmet-async';
import type { Screen } from '../types/Screen';

interface VictoryProps {
  onNavigate: (screen: Screen) => void;
  finalScore?: number;
}

const Victory = ({ onNavigate, finalScore = 0 }: VictoryProps) => {
  return (
    <>
      <Helmet>
        <title>Victory! - Blokko</title>
        <meta name="description" content="Congratulations! You've won Blokko!" />
      </Helmet>

      <div className="victory-screen">
        <div className="victory-content">
          <h1 className="victory-title">🎉 VICTORY! 🎉</h1>
          
          <div className="score-card">
            <div className="score-number">{finalScore}</div>
            <div className="score-description">Moves to Victory</div>
          </div>

          <div className="action-buttons">
            <button
              onClick={() => onNavigate('game')}
              className="action-button-primary"
            >
              PLAY AGAIN
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

export default Victory;
