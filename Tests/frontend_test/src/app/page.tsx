"use client";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/Dashboard">
        <button type="button">Dashboard</button>
      </Link>
      <Link href="/TicTacToe">
        <button type="button">TicTacToe</button>
      </Link>
      <Link href="/ServerActionsTests">
        <button type="button">ServerActions Tests</button>
      </Link>
    </main>
  );
}
