"use client";

import Link from "next/link";
import Board from "./Board/Board.component";
import { useReducer, useState } from "react";

enum ReducerActions {
  SET_NEXT_PLAYER,
  SET_HISTORY,
  SET_CURRENT_MOVE,
  SET_PLAY,
  SET_JUMP_TO,
}

interface IGameState {
  isNext: boolean;
  history: string[][];
  currentMove: number;
}

type TReducerAction =
  | {
      type: ReducerActions.SET_PLAY;
      payload: string[];
    }
  | {
      type: ReducerActions.SET_JUMP_TO;
      payload: number;
    };

const initialGameState: IGameState = {
  isNext: true,
  history: [Array(9).fill("")],
  currentMove: 0,
};

function reducer(state: IGameState, action: TReducerAction) {
  switch (action.type) {
    case ReducerActions.SET_JUMP_TO:
      return {
        isNext: action.payload % 2 === 0,
        history: state.history.slice(0, action.payload + 1),
        currentMove: action.payload,
      };
    case ReducerActions.SET_PLAY:
      return {
        isNext: !state.isNext,
        history: [...state.history, action.payload],
        currentMove:
          [...state.history.slice(0, state.currentMove + 1), action.payload]
            .length - 1,
      };
    default:
      return state;
  }
}

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
  const [{ isNext, currentMove, history }, gameStateUpdate] = useReducer(
    reducer,
    initialGameState
  );
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    gameStateUpdate({
      type: ReducerActions.SET_PLAY,
      payload: nextSquares,
    });
  }

  function jumpTo(nextMove: number) {
    gameStateUpdate({
      type: ReducerActions.SET_JUMP_TO,
      payload: nextMove,
    });
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
