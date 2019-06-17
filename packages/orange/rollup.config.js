import babel from 'rollup-plugin-babel';
import run from 'rollup-plugin-run';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

const plugins = [
  scss(),
  commonjs({
    include: [
      'node_modules/**',
    ],
    exclude: [
      'node_modules/process-es6/**',
    ],
    namedExports: {
      'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
      'node_modules/react-dom/index.js': ['render'],
    },
  }),
  nodeResolve(),
  babel(),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(run())
}

export default {
  input: 'server/index.js',
  external,
  output: [
    {
      file: 'build/server/index.js',
      format: 'umd',
      sourcemap: 'inline',
    },
  ],
  plugins
};
