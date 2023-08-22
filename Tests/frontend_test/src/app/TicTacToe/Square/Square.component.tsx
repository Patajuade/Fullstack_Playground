import styles from "./styles.module.css";

interface ISquareProps {
  value: string;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: ISquareProps) {
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
