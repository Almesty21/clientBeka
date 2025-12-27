// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Correct import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Use tailwindcss here
  ],
  build: {
    outDir: "build", // Output directory for the build
  },
  server: {
    port: 3000, // Optionally specify a port
    open: true, // Automatically open the app in the browser
  },
});
