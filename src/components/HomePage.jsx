import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Container className="text-center mt-5 page-container">
      <h1>Minesweeper Game</h1>
      <p>
        Welcome to the classic Minesweeper game! Use logic to find all the safe
        squares and avoid the bombs.
      </p>
      <div>
        <Button as={Link} to="/game/easy" className="m-2 btn">
          Play Game
        </Button>
        <Button as={Link} to="/rules" className="m-2 btn">
          Rules
        </Button>
      </div>
    </Container>
  );
}
