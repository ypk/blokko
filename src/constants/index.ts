export const SCREEN = {
    MENU: 'menu',
    GAME: 'game',
    SETTINGS: 'settings',
    VICTORY: 'victory',
    GAME_OVER: 'game_over'
} as const;

export const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
} as const;

export const GAME_STATUS = {
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost'
} as const;

export const GRID_SIZE = {
    SMALL: 6,
    MEDIUM: 8,
    LARGE: 10
} as const;

export const HINT_DISPLAY_DURATION = 10000;
export const SINGLE_CELL_TIMEOUT = 30000;
export const NO_SELECTION_TIMEOUT = 60000;
export const HINT_DISPLAY_TIMEOUT = 60000;
