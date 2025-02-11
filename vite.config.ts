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
			components: path.resolve(__dirname, './src/components'),
			graph: path.resolve(__dirname, './src/graph'),
			types: path.resolve(__dirname, './src/type'),
			'@tests': path.resolve(__dirname, './tests'),
		},
	},
});
