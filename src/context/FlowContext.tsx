import React, { createContext, useContext, useState, useCallback } from 'react';
import type { FlowState, Screen, Settings } from '../types/Flow';

interface FlowContextType {
    gameFlow: FlowState;
    navigateToScreen: (screen: Screen) => void;
    updateSettings: (settings: Partial<Settings>) => void;
    setFinalScore: (score: number) => void;
    resetGame: () => void;
}

const defaultSettings: Settings = {
    hintTimeout: 30,
    showTimer: true,
    soundEnabled: true,
    difficulty: 'medium',
    gridSize: 10,
};

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameFlow, setGameFlow] = useState<FlowState>({
        currentScreen: 'menu',
        settings: { ...defaultSettings },
    });

    const navigateToScreen = useCallback((screen: Screen) => {
        setGameFlow(prev => ({
            ...prev,
            currentScreen: screen,
        }));
    }, []);

    const updateSettings = useCallback((newSettings: Partial<Settings>) => {
        setGameFlow(prev => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings },
        }));
    }, []);

    const setFinalScore = useCallback((score: number) => {
        setGameFlow(prev => ({
            ...prev,
            finalScore: score,
        }));
    }, []);

    const resetGame = useCallback(() => {
        setGameFlow(prev => ({
            ...prev,
            currentScreen: 'playing',
            finalScore: undefined,
            gameStats: undefined,
        }));
    }, []);

    return (
        <FlowContext.Provider value={{
            gameFlow,
            navigateToScreen,
            updateSettings,
            setFinalScore,
            resetGame,
        }}>
            {children}
        </FlowContext.Provider>
    );
};

export const useFlow = () => {
    const context = useContext(FlowContext);
    if (context === undefined) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
};
