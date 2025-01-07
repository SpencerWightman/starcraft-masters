"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import LayoutUI from "@/components/layout/LayoutUI";
import "./global.css";

const queryClient = new QueryClient();

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <LayoutUI>{children}</LayoutUI>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
