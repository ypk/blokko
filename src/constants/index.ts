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
