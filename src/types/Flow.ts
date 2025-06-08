import { DIFFICULTY, GRID_SIZE } from '../constants';
import type { Screen } from './Screen';

export interface Settings {
    hintTimeout: number;
    showTimer: boolean;
    soundEnabled: boolean;
    difficulty: typeof DIFFICULTY[keyof typeof DIFFICULTY];
    gridSize: typeof GRID_SIZE[keyof typeof GRID_SIZE];
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
