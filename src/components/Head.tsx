import { Helmet } from 'react-helmet-async';
import type { State as GameState } from '../types/State';

interface GameHeadProps {
    gameStatus: GameState['gameStatus'];
    moveCount: number;
}

const Head = ({ gameStatus, moveCount }: GameHeadProps) => {
    const getTitle = () => {
        switch (gameStatus) {
            case 'playing':
                return `Blokko - ${moveCount} moves`;
            case 'won':
                return 'Blokko - You Won! 🎉';
            case 'lost':
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
