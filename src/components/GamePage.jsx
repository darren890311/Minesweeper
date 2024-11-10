import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "./GameProvider";
import Grid from "./Grid";
import { Link } from "react-router-dom";

export default function GamePage() {
  const { difficulty } = useParams();
  const { setGridSize, setNumMines, setGrid, gridSize, numMines, grid } =
    useContext(GameContext);

  const [gameStatus, setGameStatus] = useState("");
  const [isFirstClick, setIsFirstClick] = useState(true);

  useEffect(() => {
    if (difficulty === "easy") {
      setGridSize({ rows: 8, cols: 8 });
      setNumMines(10);
    } else if (difficulty === "medium") {
      setGridSize({ rows: 16, cols: 16 });
      setNumMines(40);
    } else if (difficulty === "hard") {
      setGridSize({ rows: 30, cols: 16 });
      setNumMines(99);
    }
  }, [difficulty, setGridSize, setNumMines]);

  const initializeGrid = () => {
    setIsFirstClick(true);
    const newGrid = Array.from({ length: gridSize.rows }, () =>
      Array.from({ length: gridSize.cols }, () => ({
        isMine: false,
        isRevealed: false,
        adjacentMines: 0,
      }))
    );
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const randomRow = Math.floor(Math.random() * gridSize.rows);
      const randomCol = Math.floor(Math.random() * gridSize.cols);

      if (!newGrid[randomRow][randomCol].isMine) {
        newGrid[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }
    }
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        if (!newGrid[row][col].isMine) {
          let mineCount = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (
                newRow >= 0 &&
                newRow < gridSize.rows &&
                newCol >= 0 &&
                newCol < gridSize.cols &&
                newGrid[newRow][newCol].isMine
              ) {
                mineCount++;
              }
            }
          }
          newGrid[row][col].adjacentMines = mineCount;
        }
      }
    }
    setGrid(newGrid);
    setGameStatus("");
  };
  useEffect(() => {
    if (gridSize.rows && gridSize.cols) {
      initializeGrid();
    }
  }, [gridSize, setGrid, numMines]);

  useEffect(() => {
    const checkGameStatus = () => {
      let revealedCount = 0;
      for (let row of grid) {
        for (let cell of row) {
          if (cell.isRevealed && cell.isMine) {
            setGameStatus("Game Over! You Lost!");
            return;
          }
          if (cell.isRevealed && !cell.isMine) {
            revealedCount++;
          }
        }
      }
      if (revealedCount === gridSize.rows * gridSize.cols - numMines) {
        setGameStatus("Game Over! You Won!");
      }
    };
    checkGameStatus();
  }, [grid, gridSize, numMines]);

  useEffect(() => {
    const savedGameData = localStorage.getItem("minesweeperGame");
    if (savedGameData) {
      const { grid, gameStatus, isFirstClick } = JSON.parse(savedGameData);
      setGrid(grid);
      setGameStatus(gameStatus);
      setIsFirstClick(isFirstClick);
    } else {
      initializeGrid();
    }
  }, []);

  useEffect(() => {
    const gameData = {
      grid,
      gameStatus,
      isFirstClick,
    };
    localStorage.setItem("minesweeperGame", JSON.stringify(gameData));
  }, [grid, gameStatus, isFirstClick]);

  const resetGame = () => {
    initializeGrid();
    setGameStatus("");
    localStorage.removeItem("minesweeperGame");
  };

  return (
    <div className="game-container">
      <h1>Minesweeper - {difficulty}</h1>
      <h2>{gameStatus}</h2>
      <button onClick={resetGame} className="reset-button">
        Reset
      </button>
      <nav>
        <Link to="/game/easy" className="difficulty-link">
          Easy
        </Link>
        <Link to="/game/medium" className="difficulty-link">
          Medium
        </Link>
        <Link to="/game/hard" className="difficulty-link">
          Hard
        </Link>
      </nav>
      <div className="game-grid-container">
        <Grid
          gameStatus={gameStatus}
          isFirstClick={isFirstClick}
          setIsFirstClick={setIsFirstClick}
        />
      </div>
      <nav className="navigation-container">
        <Link to="/" className="home-page">
          Home
        </Link>
        <Link to="/rules" className="rule">
          Rules
        </Link>
      </nav>
    </div>
  );
}
