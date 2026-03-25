import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: "/",

  html: {
    // Replace this placeholder per request at the hosting/reverse-proxy layer
    // when you move to header-based nonce CSP in production.
    cspNonce: "__CSP_NONCE__",
  },

  build: {
    sourcemap: false,
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }

          if (id.includes("node_modules/gsap")) {
            return "gsap";
          }

          if (id.includes("node_modules/vue") || id.includes("node_modules/vue-router")) {
            return "vue-vendor";
          }
        },
      },
    },
  },

  server: {
    port: 5173,
    host: "127.0.0.1",
    strictPort: true,
    cors: {
      origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
    },
    headers: {
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  },

  preview: {
    host: "127.0.0.1",
    strictPort: true,
    cors: false,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  },
});
