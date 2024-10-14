"use client";  // Marque como Client Component

import { globalStyles } from "@/styles/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import SessionWrapper from "./SessionWrapper";
import { getCssText } from "@ignite-ui/react";
import { useEffect } from "react";
import { DefaultSeo } from "next-seo";

globalStyles();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'stitches';
    style.innerHTML = getCssText();
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); // Limpa o estilo quando o componente é desmontado
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionWrapper>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.url.ie/',
            siteName: 'SiteName',
          }}
        />
        {children}
      </SessionWrapper>
    </QueryClientProvider>
  );
}
