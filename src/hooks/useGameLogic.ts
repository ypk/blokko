import { useGameState } from './useGameState';
import { useCellSelection } from './useCellSelection';

export const useGameLogic = () => {
    const { gameState, setGameState, resetGame } = useGameState();
    const { handleCellClick } = useCellSelection(gameState, setGameState);

    return {
        gameState,
        handleCellClick,
        resetGame
    };
};
