"use client";

import { useState } from "react";
import Square from "../Square/Square.component";
import styles from "./styles.module.css";

export default function Board() {
  //To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead.
  //The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent.

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); //This will be used to determine who is the next player
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i: number) {
    //This condition will check if the square is already filled or if there is a winner, and prevents the player from filling it again
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); //Immutability is important, here we need it because we will implement an historic of moves and go back in time to see them
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    console.log(squares);
  }

  function calculateWinner(squares: string[]) {
    const lines = [
      //All the possible winning combinations
      [0, 1, 2], //Horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], //Vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], //Diagonal
      [2, 4, 6],
    ];

    for (const element of lines) {
      const [a, b, c] = element;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
  }

  return (
    <>
      <div className={styles.board__row}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className={styles.board__row}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className={styles.board__row}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className={styles.status}>{status}</div>
    </>
  );
}
