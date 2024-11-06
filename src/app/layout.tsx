'use client'

import { Roboto } from 'next/font/google'
import dayjs from 'dayjs'
import { globalStyles } from '@/styles/global'
import { ClientProviders } from './components/ClientProviders'
const robotoNormal = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'] 
})

globalStyles()
dayjs.locale('pt-br')
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={robotoNormal.className}>{children}</body>
      </html>
    </ClientProviders>
  )
}
