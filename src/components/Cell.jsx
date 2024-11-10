import React, { useState } from "react";
import "./GamePage.css";

export default function Cell({ cellData, onClick }) {
  return (
    <div
      className={`game-cell ${
        cellData.isRevealed
          ? cellData.isMine
            ? "revealed-mine"
            : "revealed-safe"
          : "unrevealed"
      }`}
      onClick={onClick}
    >
      {cellData.isRevealed &&
        (cellData.isMine ? "💣" : cellData.adjacentMines || "")}
    </div>
  );
}
