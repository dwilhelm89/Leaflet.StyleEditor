import { build, context } from 'esbuild';
import packageJson from '../package.json' assert { type: 'json' }
import minimist from 'minimist'

const args = minimist(process.argv.slice(2))

const config = {
  entryPoints: ["src/typescript/index.ts"],
  bundle: true,
  minify: true,
  external: Object.keys(packageJson.dependencies).concat(Object.keys(packageJson.peerDependencies)),
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
  outdir: 'dist/',
  sourcemap: args['sourcemap'] ?? false,
  minify: args['minify'] ?? false,
};


if(args['serve'] ?? false) {
  context(config).then (buildContext => { buildContext.serve({servedir: './'}) })
} else {
  build(config)
}