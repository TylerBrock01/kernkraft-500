import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3001', // El puerto de tu API de NestJS
        setupNodeEvents(on, config) {
            // implementar node event listeners aquí
        },
    },
});
