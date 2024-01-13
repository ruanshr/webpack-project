const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].min.js', // [chunkhash:8] 保留8位
    chunkFilename: '[name].[chunkhash:8].bundle.js' // [chunkhash:8] 保留8位
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node-modules/'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src') // 将 '@' 映射到 'src' 目录
    },
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './templates/index.html') })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist')
    },
    compress: true,
    port: 9000,
    proxy: {
      '/socket/': {
        target: 'ws://localhost:8080',
        ws: true, //开启ws, 如果是http代理此处可以不用设置
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/socket/']: ''
        }
      }
    }
  }
}
