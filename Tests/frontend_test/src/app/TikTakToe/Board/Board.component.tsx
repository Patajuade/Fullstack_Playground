import Square from "../Square/Square.component";
import styles from "./styles.module.css";

export default function Board() {
  return (
    <>
      <div className={styles.board__row}>
        <Square />
        <Square />
        <Square />
      </div>
      <div className={styles.board__row}>
        <Square />
        <Square />
        <Square />
      </div>
      <div className={styles.board__row}>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
