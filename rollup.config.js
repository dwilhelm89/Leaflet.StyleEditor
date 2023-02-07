import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'lib/index.js',
  output: {
    dir: 'output',
    format: 'iife'
  },
  plugins: [nodeResolve()]
};
