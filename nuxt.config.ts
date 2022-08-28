import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "mdi/css/materialdesignicons.min.css",
    "~/assets/global.css",
  ],
  loading: {
    color: "primary",
    height: "15px",
    throttle: 0,
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
