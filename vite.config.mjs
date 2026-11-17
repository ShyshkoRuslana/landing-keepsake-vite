import { defineConfig } from "vite";
import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";

export default defineConfig({
  base: "/landing-keepsake-vite/",
  plugins: [
    vituum(),
    pug({
      root: "./src",
    }),
  ],
});
