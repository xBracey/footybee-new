import React from "react";
import type { GlobalProvider } from "@ladle/react";
import "../src/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const queryClient = new QueryClient();

export const Provider: GlobalProvider = ({ children }) => (
  <MantineProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MantineProvider>
);
