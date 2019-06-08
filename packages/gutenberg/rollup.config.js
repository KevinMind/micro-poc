import babel from 'rollup-plugin-babel';
import run from 'rollup-plugin-run';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel(),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(run())
}

console.log(process.env.NODE_ENV);

const config = {
  input: './src/index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
    sourceMap: true
  },
  plugins
};

console.log(config);
export default config;
