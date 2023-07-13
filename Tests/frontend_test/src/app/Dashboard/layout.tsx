import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Layout de la page Dashboard',
  }

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>{children}</section>
  }