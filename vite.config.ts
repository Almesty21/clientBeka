// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Ensure this is imported correctly

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Make sure tailwindcss is properly configured
  ],
  build: {
    outDir: "build", // Output directory for the build
  },
  server: {
    port: 3000, // Optionally specify a port
    open: true, // Automatically open the app in the browser
  },
  // css: {
  //   postcss: {
  //     plugins: [
  //       tailwindcss(), // Ensure Tailwind CSS is included in PostCSS
  //       require('autoprefixer'), // Add autoprefixer for better CSS compatibility
  //     ],
  //   },
  // },
});
