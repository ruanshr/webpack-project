const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    foo: "./src/foo.js",
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name].[chunkhash:8].min.js", // [chunkhash:8] 保留8位
    chunkFilename: "[name].[chunkhash:8].bundle.js", // [chunkhash:8] 保留8位
  },
  externals: {
    lodash: {
      commonjs: "lodash"
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../templates/index.html"),
    }),
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: ".",
    },
  },
};
