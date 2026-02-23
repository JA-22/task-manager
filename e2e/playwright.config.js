const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },

  webServer: [
    {
      command: 'cd ../backend && node server.js',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd ../frontend && npm run preview',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    }
  ],
});