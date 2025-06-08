import { Helmet } from 'react-helmet-async';
import type { Screen } from '../../types/Screen';
import blokkoLogo from '../../img/blokko.png';

interface MenuProps {
  onNavigate: (screen: Screen) => void;
}

const Menu = ({ onNavigate }: MenuProps) => {
  return (
    <>
      <Helmet>
        <title>Blokko - Number Matching Puzzle Game</title>
        <meta name="description" content="Play Blokko, the addictive number matching puzzle game. Match numbers that add up to 10 or are identical!" />
      </Helmet>

      <div className="menu-screen">
        <div className="menu-content">
          <div className="menu-logo-container">
            <img 
              src={blokkoLogo} 
              alt="Blokko - Number Matching Puzzle Game" 
              className="menu-logo"
            />
          </div>
          
          <p className="menu-subtitle">
            Match numbers that add up to 10 or are identical!
          </p>
          
          <div className="menu-buttons">
            <button
              onClick={() => onNavigate('game')}
              className="menu-button-primary"
            >
              PLAY GAME
            </button>
            
            <button
              onClick={() => onNavigate('settings')}
              className="menu-button-secondary"
            >
              HOW TO PLAY
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
