// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
      ],
  build: {
    outDir: "build", // Output directory for the build
  },
  server: {
    port: 3000, // Optionally specify a port
    open: true, // Automatically open the app in the browser
  },
});
