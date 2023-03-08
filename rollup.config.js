import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/typescript/index.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
        'ts-color-class': 'Color',
        'leaflet': 'L'
    }
  },
  plugins: [nodeResolve(), typescript(), commonjs()]
};
