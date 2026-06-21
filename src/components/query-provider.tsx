"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) return makeQueryClient();
  if (!browserClient) browserClient = makeQueryClient();
  return browserClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState keeps the same client instance across re-renders.
  const [client] = useState(getQueryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}
