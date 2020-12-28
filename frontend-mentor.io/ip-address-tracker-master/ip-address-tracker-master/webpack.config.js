const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./js/app.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.js",
    libraryTarget: "umd",
  },

  mode: "development",

  devServer: {
    contentBase: "./build",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
  ],
};
