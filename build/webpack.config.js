const path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getPublicPath = require('./publicPath');
require("babel-polyfill");

module.exports = (env, argv) => ({
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../"),
    publicPath: getPublicPath(''),
  },
  optimization: {
    minimize: false
  },
  resolve: { // babel-plugin-webpack-alias
    alias: {
        '@app': path.join(__dirname, './src/js'), // name from app to folder root
        '@styles': path.join(__dirname, './src/sass/style.scss')
    }
  },
  plugins:
  [
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3001,
        proxy: 'http://YOUR_DOMAIN.test',
        files: ["../**/*.php", "../**/*.js"],
        notify: true
      },
      {
        reload: true,
        injectCss: true
      }
    ),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module:
  {
    rules: [
      /* JS */
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      /* CSS */
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded'
              }
            },
          },
        ],
      },
    ],
  },
});