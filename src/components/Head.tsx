import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import type { State as GameState } from '../types/State';

interface GameHeadProps {
    gameStatus: GameState['gameStatus'];
    moveCount: number;
}

const Head = ({ gameStatus, moveCount }: GameHeadProps) => {
    const getTitle = () => {
        switch (gameStatus) {
            case 'playing':
                return `Blokko - Score: ${moveCount}`;
            case 'won':
                return 'Blokko - You Won! 🎉';
            case 'lost':
                return 'Blokko - Game Over';
            default:
                return 'Blokko - Number Matching Puzzle';
        }
    };

    const title = getTitle();

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Helmet>
            <meta name="theme-color" content="#f97316" />
            <meta name="application-name" content="Blokko" />
            <meta name="description" content="Blokko - Number Matching Puzzle Game" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Helmet>
    );
};

export default Head;
