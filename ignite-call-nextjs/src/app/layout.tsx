'use client'
import { globalStyles } from "@/styles/global";
import { getCssText } from "@ignite-ui/react";
import { Roboto } from "next/font/google";
import '../lib/dayjs'
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

globalStyles()

const robotoNormal = Roboto({
  weight:['400', '500', '700'],
  subsets: ['latin']
  }
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <html lang="en">
        <head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} /> 
        </head>
        
        <body className={robotoNormal.className}>{children}</body>
        
      </html>
      </SessionProvider>
    </QueryClientProvider>
    
  );
}
