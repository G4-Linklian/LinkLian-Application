import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 1412,
    hmr: {
      overlay: false,
    },
    allowedHosts: [
      'linklian.org'
    ]
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  base: '/LinkLian-Application/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
