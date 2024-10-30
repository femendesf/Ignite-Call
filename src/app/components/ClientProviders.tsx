"use client"; 

import { globalStyles } from "@/styles/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import SessionWrapper from "./SessionWrapper";
import { ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
globalStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionWrapper>
        
        {children}
      </SessionWrapper>
    </QueryClientProvider>
  );
}
