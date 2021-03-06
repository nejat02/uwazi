/* eslint-disable */
'use strict';
process.env.NODE_ENV = 'production';
var webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");

var production = true;
var config = require('./webpack/config')(production);

config.devtool = '';
config.context = __dirname;
config.mode = 'production';
config.resolveLoader = {
  modules: ["node_modules", __dirname + "/webpack/webpackLoaders"],
  extensions: [".js", ".json", ".ts"],
  mainFields: ["loader", "main"]
},
config.module.rules.push({
  test: /world-countries/,
  loader: "country-loader"
})
config.plugins = config.plugins.concat([
  new CopyWebpackPlugin({
    patterns: [
      { from: 'node_modules/react-flags/vendor/flags', to: 'flags' }
    ]
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new OptimizeCssAssetsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
])

config.optimization.minimize = true;
config.optimization.minimizer = [new TerserWebpackPlugin({
  cache: true,
  parallel: true,
})];

config.performance = {
  hints: "warning",
}

module.exports = config;
