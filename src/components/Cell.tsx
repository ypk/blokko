import { motion } from 'framer-motion';
import type { Cell as CellType } from '../types/Cell';

interface CellProps {
    cell: CellType;
    onClick: () => void;
}

const Cell = ({ cell, onClick }: CellProps) => {
    if (cell.value === null) {
        return <div className="cell-base cell-empty" />;
    }

    const cellClasses = `cell-base ${cell.isSelected ? 'cell-selected' : 'cell-normal'}`;

    return (
        <motion.div
            className={cellClasses}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {cell.value}
        </motion.div>
    );
};

export default Cell;
