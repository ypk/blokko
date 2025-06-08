import { Helmet } from 'react-helmet-async';
import type { Screen } from '../types/Screen';

interface SettingsProps {
  onNavigate: (screen: Screen) => void;
}

const Settings = ({ onNavigate }: SettingsProps) => {
  return (
    <>
      <Helmet>
        <title>How to Play - Blokko</title>
        <meta name="description" content="Learn how to play Blokko - rules, objectives, and tips for the number matching puzzle game." />
      </Helmet>

      <div className="settings-screen">
        <div className="settings-content">
          <h1 className="settings-title">HOW TO PLAY</h1>
          
          <div className="settings-section">
            <h2 className="settings-section-title">🎯 OBJECTIVE</h2>
            <p className="settings-text">
              Clear all numbers from the grid by matching pairs that either add up to 10 or are identical numbers.
            </p>
          </div>

          <div className="settings-section">
            <h2 className="settings-section-title">🎮 HOW TO PLAY</h2>
            <div className="settings-list">
              <p className="settings-text">• Click on two adjacent numbers to select them</p>
              <p className="settings-text">• Numbers can be adjacent horizontally, vertically, or diagonally</p>
              <p className="settings-text">• Valid matches: numbers that add up to 10 (like 3+7, 4+6) or identical numbers (like 5+5, 2+2)</p>
              <p className="settings-text">• Successfully matched pairs will disappear from the grid</p>
              <p className="settings-text">• Continue until all numbers are cleared to win!</p>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-section-title">💡 EXAMPLES</h2>
            <div className="settings-list">
              <p className="settings-text">✅ Valid matches: 1+9, 2+8, 3+7, 4+6, 5+5</p>
              <p className="settings-text">✅ Identical pairs: 1+1, 2+2, 3+3, 4+4, etc.</p>
              <p className="settings-text">❌ Invalid: 2+3=5, 1+4=5 (doesn't equal 10)</p>
              <p className="settings-text">❌ Non-adjacent numbers (even if they match)</p>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-section-title">🏆 WINNING & LOSING</h2>
            <div className="settings-list">
              <p className="settings-text">🎉 <strong>You WIN</strong> when all numbers are cleared from the grid</p>
              <p className="settings-text">💔 <strong>You LOSE</strong> when no more valid matches are available</p>
              <p className="settings-text">🔥 <strong>Hints</strong> will appear if you're inactive for too long</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('menu')}
            className="settings-back-button"
          >
            BACK TO MENU
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
