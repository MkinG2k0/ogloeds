import { defineConfig, mergeConfig } from 'vite'

import viteConfig from './vite.config'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			setupFiles: './src/shared/config/setup-test.ts',
		},
	}),
)
