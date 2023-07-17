"use client"
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/Dashboard">
        <button type="button">
          Dashboard
        </button>
      </Link>

      {/* Penser à ajouter le suspense pour les composants qui appelleront l'api : https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming */}
    </main>
  )
}
