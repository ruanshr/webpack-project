const path = require('path')
const MyPlugin = require('../config/plugin/MyPlugin')
const CustomPlugin = require('../config/plugin/CustomPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    utils: './src/utils.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].min.js', // [chunkhash:8] 保留8位
    chunkFilename: '[name].[chunkhash:8].bundle.js' // [chunkhash:8] 保留8位
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'txt-loader'
      }
    ]
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../config/loader')]
  },
  plugins: [
    new MyPlugin({ name: 'tom' }),
    new HtmlWebpackPlugin({ inject: 'head' }),
    new CustomPlugin(),
    new UglifyJsPlugin()
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '.'
    }
  }
}
