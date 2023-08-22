"use client";

import Link from "next/link";
import Board from "./Board/Board.component";
import { useState } from "react";

const Moves = ({
  history,
  jumpTo,
}: {
  history: any[][];
  jumpTo: (move: number) => void;
}) => (
  <>
    <ol>
      {history.map((step, move) => (
        <li onClick={() => jumpTo(move)} key={`move_${move}_${String(step)}`}>
          {move > 0 ? `Go to move #${move}` : `Go to game start`}
        </li>
      ))}
    </ol>
  </>
);

function Game() {
  const [isNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    setHistory([...history, nextSquares]); //spread syntax : enumerate all the elements of the history array
    setXIsNext(!isNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
    setHistory(history.slice(0, nextMove + 1));
  }

  return (
    <div>
      <h1>Game</h1>
      <Board xIsNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="game-info">
        <Moves history={history} jumpTo={jumpTo} />
      </div>
      <Link href="/">
        <button type="button">Go back</button>
      </Link>
    </div>
  );
}
export default Game;
