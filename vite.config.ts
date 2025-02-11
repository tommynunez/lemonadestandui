import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			external: [
				'react', // ignore react stuff
				'react-dom',
			],
		},
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			'@tests': path.resolve(__dirname, './tests'),
		},
	},
});
