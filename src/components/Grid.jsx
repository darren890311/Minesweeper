import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import Cell from "./Cell";

export default function Grid({ gameStatus, isFirstClick, setIsFirstClick }) {
  const { grid, setGrid } = useContext(GameContext);

  if (!grid.length || !grid[0].length) return null;

  const handleCellClick = (row, col) => {
    if (gameStatus) return;
    if (isFirstClick) {
      let newGrid = [...grid];
      if (grid[row][col].isMine) {
        newGrid[row][col].isMine = false;
        let placed = false;
        while (!placed) {
          const randomRow = Math.floor(Math.random() * grid.length);
          const randomCol = Math.floor(Math.random() * grid[0].length);
          if (
            !newGrid[randomRow][randomCol].isMine &&
            (randomRow !== row || randomCol !== col)
          ) {
            newGrid[randomRow][randomCol].isMine = true;
            placed = true;
          }
        }
      }
      newGrid[row][col].isRevealed = true;
      setGrid(newGrid);
      setIsFirstClick(false);
    } else {
      const newGrid = [...grid];
      newGrid[row][col].isRevealed = true;
      setGrid(newGrid);
    }
  };
  return (
    <div
      className="game-grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, var(--cell-size))`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cellData={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}
