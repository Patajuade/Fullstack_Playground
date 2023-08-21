"use client";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/Dashboard">
        <button type="button">Dashboard</button>
      </Link>
      <Link href="/TikTakToe">
        <button type="button">TikTakToe</button>
      </Link>
    </main>
  );
}
