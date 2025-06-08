import type { Cell as CellType } from '../types/Cell';
import { isCellHinted } from '../utils/hints';
import Cell from './Cell';

interface GridProps {
    grid: CellType[][];
    onCellClick: (cell: CellType) => void;
    hintCells?: CellType[];
    gridSize: number;
}

const Grid = ({ grid, onCellClick, hintCells = [], gridSize }: GridProps) => {
    return (
        <div className="grid-container">
            <div className={`grid-layout-${gridSize}`}>
                {grid.flat().map((cell) => (
                    <Cell
                        key={cell.id}
                        cell={cell}
                        onClick={() => onCellClick(cell)}
                        isHinted={isCellHinted(cell, hintCells)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Grid;
