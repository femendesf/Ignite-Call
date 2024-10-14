import { Roboto } from "next/font/google";
import '../lib/dayjs'
import ClientProviders from "./ClientProviders";
import type { Metadata } from 'next'

const robotoNormal = Roboto({
  weight:['400', '500', '700'],
  subsets: ['latin']
  }
)

export const metadata: Metadata  = {
  title: 'Descomplique sua agenda | Ignite Call',
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={robotoNormal.className}>
        <ClientProviders>
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
