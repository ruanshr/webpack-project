const path = require('path')
const MyPlugin = require('./config/MyPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    utils: './src/utils.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].[chunkhash:8].min.js', // [chunkhash:8] 保留8位
    chunkFilename: '[name].[chunkhash:8].bundle.js' // [chunkhash:8] 保留8位
  },
  plugins:[
    new MyPlugin({ name:'tom' }),
    new HtmlWebpackPlugin({})
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '.'
    }
  }
}
