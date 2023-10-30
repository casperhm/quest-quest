import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        assetsInlineLimit: 0,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});
