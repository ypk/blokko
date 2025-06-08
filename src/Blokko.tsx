import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Game from './components/Game';
import MenuScreen from './components/Menu';
import SettingsScreen from './components/Settings';
import VictoryScreen from './components/Victory';
import GameOverScreen from './components/GameOver';
import type { Screen } from './types/Screen';

export interface AppState {
  currentScreen: Screen;
  finalScore?: number;
}

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'menu'
  });

  const navigateToScreen = (screen: Screen, finalScore?: number) => {
    setAppState({
      currentScreen: screen,
      finalScore
    });
  };

  const renderCurrentScreen = () => {
    switch (appState.currentScreen) {
      case 'menu':
        return <MenuScreen onNavigate={navigateToScreen} />;
      case 'game':
        return <Game onNavigate={navigateToScreen} />;
      case 'settings':
        return <SettingsScreen onNavigate={navigateToScreen} />;
      case 'victory':
        return <VictoryScreen onNavigate={navigateToScreen} finalScore={appState.finalScore} />;
      case 'gameover':
        return <GameOverScreen onNavigate={navigateToScreen} finalScore={appState.finalScore} />;
      default:
        return <MenuScreen onNavigate={navigateToScreen} />;
    }
  };

  return (
    <HelmetProvider>
      {renderCurrentScreen()}
    </HelmetProvider>
  );
};

export default App;
