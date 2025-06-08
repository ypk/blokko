import React, { createContext, useContext, useState, useCallback } from 'react';
import { SCREEN, DIFFICULTY, GRID_SIZE } from '../constants';
import type { Screen } from '../types/Screen';
import type { FlowState, Settings } from '../types/Flow';

interface FlowContextType {
    flowState: FlowState;
    navigateTo: (screen: Screen, finalScore?: number) => void;
    updateSettings: (settings: Partial<Settings>) => void;
    setFinalScore: (score: number) => void;
    resetGame: () => void;
}

const defaultSettings: Settings = {
    hintTimeout: 60000,
    showTimer: true,
    soundEnabled: true,
    difficulty: DIFFICULTY.MEDIUM,
    gridSize: GRID_SIZE.MEDIUM
};

const defaultFlowState: FlowState = {
    currentScreen: SCREEN.MENU,
    settings: defaultSettings
};

const FlowContext = createContext<FlowContextType | undefined>(undefined);

interface FlowProviderProps {
    children: React.ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {
    const [flowState, setFlowState] = useState<FlowState>(defaultFlowState);

    const navigateTo = useCallback((screen: Screen, finalScore?: number) => {
        setFlowState((prev: FlowState) => ({
            ...prev,
            currentScreen: screen,
            ...(finalScore !== undefined && { finalScore })
        }));
    }, []);

    const updateSettings = useCallback((newSettings: Partial<Settings>) => {
        setFlowState((prev: FlowState) => ({
            ...prev,
            settings: {
                ...prev.settings,
                ...newSettings
            }
        }));
    }, []);

    const setFinalScore = useCallback((score: number) => {
        setFlowState((prev: FlowState) => ({
            ...prev,
            finalScore: score
        }));
    }, []);

    const resetGame = useCallback(() => {
        setFlowState((prev: FlowState) => ({
            ...prev,
            currentScreen: SCREEN.GAME,
            finalScore: undefined,
            gameStats: undefined
        }));
    }, []);

    const contextValue: FlowContextType = {
        flowState,
        navigateTo,
        updateSettings,
        setFinalScore,
        resetGame
    };

    return (
        <FlowContext.Provider value={contextValue}>
            {children}
        </FlowContext.Provider>
    );
};

export const useFlow = (): FlowContextType => {
    const context = useContext(FlowContext);
    if (context === undefined) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
};
