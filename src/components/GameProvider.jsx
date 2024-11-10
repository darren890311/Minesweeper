import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [numMines, setNumMines] = useState(0);
  const [grid, setGrid] = useState([]);

  return (
    <GameContext.Provider
      value={{ grid, setGrid, gridSize, setGridSize, numMines, setNumMines }}
    >
      {children}
    </GameContext.Provider>
  );
};
