import React from "react";
import "./Rules.css";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Rules() {
  return (
    <Container className="rules-container">
      <div className="rules">
        <h1>Game Rules</h1>
        <p>
          Minesweeper is a game where mines are hidden in a grid of squares.
          Safe squares have numbers telling you how many mines touch the square.
          You can use the number clues to solve the game by opening all of the
          safe squares. If you click on a mine you lose the game!
        </p>
        <h2>Difficulty Levels</h2>
        <ul>
          <li>Easy - 8 X 8 board with 10 mines</li>
          <li>Medium - 16 X 16 board with 40 mines</li>
          <li>Hard - 30 X 16 board with 99 mines</li>
        </ul>
      </div>
      <div>
        <Button as={Link} to="/" className="m-2 rule-btn">
          Home
        </Button>
        <Button as={Link} to="/game/easy" className="m-2 rule-btn">
          Play Game
        </Button>
      </div>
    </Container>
  );
}
