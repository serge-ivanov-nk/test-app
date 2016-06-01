// jscs:disable
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      './src/client.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/build/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ExtractTextPlugin("main.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/static/favicon.ico'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.sass/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.js?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.(woff|woff2)/,
        loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)/,
        loader: 'file?prefix=font/'
      },
      {
        test: /\.(png|ico|gif)$/,
        loader: 'file',
        include: path.join(__dirname, 'src', 'static')
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/i,
        loader: 'static'
      }
    ]
  }
};
