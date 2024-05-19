import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";

const isLadle = !!process.env.VITE_LADLE_APP_ID;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA({
      devOptions: {
        enabled: false,
      },
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#0C5941",
        background_color: "#0C5941",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "FootyBee",
        description: "FootyBee - Euro 2024 Predictor",
        name: "FootyBee",
        icons: [
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/android-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 7232,
  },
  preview: {
    host: "0.0.0.0",
    port: 7232,
  },
  resolve: {
    alias: isLadle
      ? {
          "@tanstack/react-router": path.resolve(
            __dirname,
            "./.ladle/Router.tsx"
          ),
        }
      : {},
  },
  publicDir: "public",
});
