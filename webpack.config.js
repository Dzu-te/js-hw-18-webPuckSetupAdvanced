const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    stats: './src/statistics.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'My super Project - Main!',
      chunks: ['main', 'stats']
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource'
      }
    ],
  }
};