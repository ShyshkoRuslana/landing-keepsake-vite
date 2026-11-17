import { defineConfig } from "vite";
import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/landing-keepsake-vite/" : "/",
  plugins: [
    vituum(),
    pug({
      root: "./src",
    }),
  ],
});
