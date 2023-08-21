import Link from "next/link";
import Board from "./Board/Board.component";

function Game() {
  return (
    <div>
      <h1>Game</h1>
      <Board />
      <Link href="/">
        <button type="button">Go back</button>
      </Link>
    </div>
  );
}
export default Game;
