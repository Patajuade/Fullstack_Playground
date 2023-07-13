"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';



export default function Home() {

  const router = useRouter();

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
