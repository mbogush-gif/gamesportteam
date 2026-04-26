import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const faceitKey = env.FACEIT_API_KEY ?? "";

  return {
    base: "/gamesportteam/",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion"],
    },
    server: {
      proxy: {
        "/api/faceit": {
          target: "https://open.faceit.com/data/v4",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/faceit/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (faceitKey) {
                proxyReq.setHeader("Authorization", `Bearer ${faceitKey}`);
              }
            });
          },
        },
      },
    },
  };
});
