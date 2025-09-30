import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "frontend/build", // 👈 build output folder
    emptyOutDir: true, // clears folder before build
  },
});
