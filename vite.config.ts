import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react';
import macrosPlugin from "vite-plugin-babel-macros";
import md from 'vite-plugin-react-md';
import { Mode, plugin } from 'vite-plugin-markdown'
const path = require("path");

export default defineConfig({
  plugins: [
    macrosPlugin(),
    reactPlugin(),
    plugin(),
  ],
});