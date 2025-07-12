"use client";

import LayoutUI from "@/components/layout/LayoutUI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <LayoutUI>{children}</LayoutUI>
      </SessionProvider>
    </QueryClientProvider>
  );
}
