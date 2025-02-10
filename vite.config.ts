import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import md from 'vite-plugin-react-md';
import { Mode, plugin } from 'vite-plugin-markdown';
const path = require('path');
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
	plugins: [macrosPlugin(), reactPlugin(), plugin(), nodeResolve(), commonjs()],
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
					return;
				}
				warn(warning);
			},
		},
	},
});
