const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const IS_DEV = process.env.NODE_ENV === 'development';

const extractCssPlugin = new MiniCssExtractPlugin({
  filename: IS_DEV ? '[name].css' : '[name].[hash].css',
  chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css'
});

const plugins = [
  extractCssPlugin,
  new webpack.HotModuleReplacementPlugin(),
  new ManifestPlugin({
    // in real example you would use PUBLIC_PATH + STATIC_PATH and let your http gateway handle proxy to right node.js server
    publicPath: 'http://localhost:8081/static/'
  })
];

if (IS_DEV) {
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html'
    })
  )
}

const styleLoader = IS_DEV
  ? {
    loader: 'style-loader',
    options: {
      hmr: true,
      sourceMap: true
    }
  }
  : MiniCssExtractPlugin.loader;

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
  }
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    options: {},
    plugins: [autoprefixer({ browsers: ['last 2 version', 'ie >= 11'] })]
  }
};

const sassLoader = 'sass-loader';

module.exports = {
  entry: './src/index.js',
  mode: IS_DEV ? 'development': 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          styleLoader,
          cssLoader,
          postCssLoader,
          sassLoader
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins,
  output: {
    path: __dirname + '/build/client',
    publicPath: '/',
    filename: 'index.js'
  },
  devServer: {
    port: 8080,
    contentBase: './build/client',
    hot: true
  }
};
