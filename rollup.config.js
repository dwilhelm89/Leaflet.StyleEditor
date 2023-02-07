import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/typescript/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript()]
};
