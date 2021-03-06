const webpack = require('webpack')
const webpackFailPlugin = require('webpack-fail-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = require('./webpack.config.base.js')

module.exports = function () {
  const myProdConfig = webpackConfig
  myProdConfig.output.filename = '[name].[hash].js'
  
  // https://webpack.js.org/configuration/mode/
  // Please remember that setting NODE_ENV doesn't automatically set mode.
  myProdConfig.mode = 'production';

  myProdConfig.optimization = {
    usedExports: true,
    sideEffects: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ]
  };

  myProdConfig.plugins = myProdConfig.plugins.concat(
    webpackFailPlugin
  )

  return myProdConfig
}
