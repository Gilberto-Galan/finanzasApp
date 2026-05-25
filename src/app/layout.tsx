import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finanzas Personales',
  description: 'Control de gastos e ingresos personales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${geist.className} bg-slate-950 text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}