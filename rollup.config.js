import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import url from 'postcss-url';

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
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    scss({
      processor: () => postcss().use(url({url: 'copy', assetsPath: 'assets'})), 
      fileName: 'Leaflet.StyleEditor.css',
      outputStyle: 'compressed',
    }),
  ]
};
