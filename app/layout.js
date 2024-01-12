import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from 'app/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Boilerplate App',
  description: 'Change this description',
}

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}
