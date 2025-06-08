import { motion } from 'framer-motion';
import type { Cell as CellType } from '../types/Cell';

interface CellProps {
    cell: CellType;
    onClick: () => void;
    isHinted?: boolean;
}

const Cell = ({ cell, onClick, isHinted = false }: CellProps) => {
    if (cell.value === null) {
        return <div className="cell-base cell-empty" />;
    }

    const getCellClasses = () => {
        if (isHinted) {
            return 'cell-base cell-hinted';
        }
        return `cell-base ${cell.isSelected ? 'cell-selected' : 'cell-normal'}`;
    };

    return (
        <motion.div
            className={getCellClasses()}
            onClick={onClick}
            whileHover={{ scale: isHinted ? 1.12 : 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {cell.value}
        </motion.div>
    );
};

export default Cell;
