export interface Cell {
    id: string;
    value: number | null;
    row: number;
    col: number;
    isSelected: boolean;
}