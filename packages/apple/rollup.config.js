import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      sourcemap: 'inline',
    },
  ],
  plugins: [
    htmlTemplate({
      template: 'src/page.html',
      target: 'index.html',
    }),
    nodeResolve({
      browser: true,
    }),
    json(),
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
    babel(),
    serve({
      contentBase: 'build',
      open: true,
      port: 8080
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
    })
  ],
};
