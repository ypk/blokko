import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Game from './components/screens/Game';
import Menu from './components/screens/Menu';
import Settings from './components/screens/Settings';
import Victory from './components/screens/Victory';
import GameOver from './components/screens/GameOver';
import type { Screen } from './types/Screen';
import { SCREEN } from './constants';


const Blokko = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>(SCREEN.MENU);
  const [finalScore, setFinalScore] = useState<number>(0);

  const handleNavigate = (screen: Screen, score?: number) => {
    setCurrentScreen(screen);
    if (score !== undefined) {
      setFinalScore(score);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREEN.MENU:
        return <Menu onNavigate={handleNavigate} />;
      case SCREEN.GAME:
        return <Game onNavigate={handleNavigate} />;
      case SCREEN.SETTINGS:
        return <Settings onNavigate={handleNavigate} />;
      case SCREEN.VICTORY:
        return <Victory onNavigate={handleNavigate} finalScore={finalScore} />;
      case SCREEN.GAME_OVER:
        return <GameOver onNavigate={handleNavigate} finalScore={finalScore} />;
      default:
        return <Menu onNavigate={handleNavigate} />;
    }
  };

  return (
    <HelmetProvider>
      {renderScreen()}
    </HelmetProvider>
  );
};

export default Blokko
