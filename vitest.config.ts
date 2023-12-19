/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { UserConfig } from 'vitest/config'

// You can import other Vite plugins if needed

// Define your project root and any other paths you need
const projectRoot = path.resolve(__dirname)

const config: UserConfig = {
  // Define your Vitest-specific configurations here
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(projectRoot, 'src/tests/setup.ts')],
    css: true,
  },
  // You can still include Vite plugins necessary for your tests
  plugins: [react()],
  // Other Vitest configurations...
}

export default defineConfig(config)
