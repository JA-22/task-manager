import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },

  webServer: [
    {
      command: 'npm run dev',
      cwd: '../frontend',
      port: 5173,
      timeout: 120000,
      reuseExistingServer: true,
    },
    {
      command: 'node server.js',
      cwd: '../backend',
      port: 3000,
      timeout: 120000,
      reuseExistingServer: true,
    }
  ],
});