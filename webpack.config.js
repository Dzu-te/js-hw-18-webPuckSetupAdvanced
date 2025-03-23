const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');




const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    stats: './src/statistics.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].bundle.[contenthash].js' : '[name].js',
  },
  target: 'web',

  devServer: {
    port: 4200,
    hot: false
  },
  devtool: isProd ? false : 'source-map',
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'My super Project - Home!',
      chunks: ['main', 'stats']
    }),
    new HTMLWebpackPlugin({
      filename: 'main.html',
      template: path.resolve(__dirname, 'src/main.html'),
      title: 'Main!',
      chunks: ['main', 'stats']
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].min.css' : '[name].css'
    }),
    new EslintWebpackPlugin({
      extensions: ['js'],
      fix: true,
      configType: 'eslinterc'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource'
      },
      {
        test: /\.js$/, // Відповідає усім .js файлам
        exclude: /node_modules/, // Виключає папку node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Використовує preset-env для транспіляції сучасного JS
          }
        }
      },

    ],

  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin()
    ]
  }
};