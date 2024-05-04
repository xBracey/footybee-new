import React from "react";
import type { GlobalProvider } from "@ladle/react";
import "../src/index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const Provider: GlobalProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
