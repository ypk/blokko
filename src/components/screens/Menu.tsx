import { Helmet } from 'react-helmet-async';
import type { Screen } from '../../types/Screen';
import Logo from '../Logo';

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

      <div className="game-container">
        <div className="game-content">
          <Logo 
            width={400} 
            height={120} 
            animated={true}
            autoPlay={true}
            className="mb-8"
          />
          
          <p className="menu-subtitle text-center text-lg text-gray-700 mb-8">
            Match numbers that add up to 10 or are identical!
          </p>
          
          <div className="menu-buttons flex flex-col gap-4 items-center">
            <button
              onClick={() => onNavigate('game')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg min-w-48"
            >
              PLAY GAME
            </button>
            
            <button
              onClick={() => onNavigate('settings')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg min-w-48"
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
