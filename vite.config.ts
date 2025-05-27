import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import codegen from 'vite-plugin-graphql-codegen';
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react(), tsconfigPaths(), svgr()],
})
