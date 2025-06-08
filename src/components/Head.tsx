import { Helmet } from 'react-helmet-async';
import type { State as GameState } from '../types/State';
import { GAME_STATUS } from '../constants';

interface GameHeadProps {
    gameStatus: GameState['gameStatus'];
    moveCount: number;
}

const Head = ({ gameStatus, moveCount }: GameHeadProps) => {
    const getTitle = () => {
        switch (gameStatus) {
            case GAME_STATUS.PLAYING:
                return `Blokko - ${moveCount} moves`;
            case GAME_STATUS.WON:
                return 'Blokko - You Won! 🎉';
            case GAME_STATUS.LOST:
                return 'Blokko - Game Over';
            default:
                return 'Blokko - Number Matching Puzzle';
        }
    };

    const title = getTitle();

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="theme-color" content="#4F46E5" />
            <meta name="application-name" content="Blokko" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Helmet>
    );
};

export default Head;
