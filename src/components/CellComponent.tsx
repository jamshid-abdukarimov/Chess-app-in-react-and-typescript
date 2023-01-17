import React, { FC } from "react";
import { Cell } from "../models/Cell";
interface CellProps {
  cell: Cell;
  selected: boolean;
  setSelectedCell: (cell: Cell) => void;
}
const CellComponent: FC<CellProps> = ({ cell, selected, setSelectedCell }) => {
  return (
    <div
      onClick={() => setSelectedCell(cell)}
      className={`cell ${cell.color} ${selected ? "selected" : ""}`}
      style={{
        backgroundColor: cell.available && cell.figure ? "green" : "",
      }}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && (
        <img src={cell.figure.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};

export default CellComponent;
