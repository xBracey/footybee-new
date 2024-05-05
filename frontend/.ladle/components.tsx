import React from "react";
import type { GlobalProvider } from "@ladle/react";
import "../src/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

export const Provider: GlobalProvider = ({ children }) => (
  <MantineProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MantineProvider>
);
