var ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ManifestPlugin({
    // in real example you would use PUBLIC_PATH + STATIC_PATH and let your http gateway handle proxy to right node.js server
    publicPath: 'http://localhost:8081/static/'
  })
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html'
    })
  )
}

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
    contentBase: './build/client',
    hot: true
  }
};
