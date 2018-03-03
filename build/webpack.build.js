'use strict'
const webpack = require('webpack')
const config = require('./webpack.base.conf')
const getPostcssPlugin = require('./utils/postcss_pipe');

config.entry = {
  'vui': './src/index.js'
};

config.output = {
  filename: './lib/[name].js',
  library: 'vui',
  libraryTarget: 'umd'
};

config.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      postcss: getPostcssPlugin,
      babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'transform-vue-jsx']
      },
      vue: {
        autoprefixer: false,
        preserveWhitespace: false,
        postcss: getPostcssPlugin
      }
    }
  })
];

delete config.devtool;

module.exports = config;
