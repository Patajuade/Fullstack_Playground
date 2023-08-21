"use client";

import { useState } from "react";
import styles from "./styles.module.css";

interface ISquareProps {
  value: string;
}

function Square() {
  const [value, setValue] = useState<string>("");

  function clickHandler() {
    setValue("X");
  }

  return (
    <button className={styles.square} onClick={clickHandler}>
      {value}
    </button>
  );
}

export default Square;
