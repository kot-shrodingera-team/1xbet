import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: './src/index.ts',
  output: {
    format: 'es',
    file: './dist/index.js',
  },
  plugins: [typescript(), json()],
};
