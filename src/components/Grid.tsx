import type { Cell as CellType } from '../types/Cell';
import Cell from './Cell';

interface GridProps {
    grid: CellType[][];
    onCellClick: (cell: CellType) => void;
}

const Grid = ({ grid, onCellClick }: GridProps) => {
    return (
        <div className="grid-container">
            <div className="grid-layout">
                {grid.flat().map((cell) => (
                    <Cell
                        key={cell.id}
                        cell={cell}
                        onClick={() => onCellClick(cell)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Grid;
