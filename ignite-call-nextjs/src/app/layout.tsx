'use client'
import { globalStyles } from "@/styles/global";
import { getCssText } from "@ignite-ui/react";
import { Roboto } from "next/font/google";

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
    
    <html lang="en">
      <head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} /> 
      </head>
      
      <body className={robotoNormal.className}>{children}</body>
      
    </html>
  );
}
