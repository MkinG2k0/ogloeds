import reactInspector from 'vite-plugin-react-find'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: './web',
	},
	plugins: [reactInspector(), react(), tsconfigPaths()],
})
