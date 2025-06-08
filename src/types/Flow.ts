export type Screen = 'menu' | 'playing' | 'settings' | 'gameOver' | 'victory';

export interface Settings {
    hintTimeout: number;
    showTimer: boolean;
    soundEnabled: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
    gridSize: 10 | 12 | 15;
}

export interface FlowState {
    currentScreen: Screen;
    settings: Settings;
    finalScore?: number;
    gameStats?: {
        timeElapsed: number;
        hintsUsed: number;
        perfectMatches: number;
    };
}
