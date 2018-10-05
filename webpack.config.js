/* globals module require __dirname */

const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/only-dev-server',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg(\?v\=.*)?$|\.woff(\?v\=.*)?$|\.ttf(\?v\=.*)?$|\.eot(\?v\=.*)?$|\.woff?2(\?v\=.*)?/, // eslint-disable-line max-len
        loader: 'file-loader?name=[path][name].[ext]'
      }]
  },
  postcss() {
    return [precss, autoprefixer];
  }
};
