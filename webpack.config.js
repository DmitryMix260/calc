const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    clean: true,
    environment: {
      arrowFunction: false,
    },
    filename: '[name].bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  devtool:
  process.env.NODE_ENV === 'production'
    ? 'hidden-source-map'
    : 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            chunkFilename: '[name].[contenthash].css',
            filename: '[name].[contenthash].css',
          }),
        ]
        :[new MiniCssExtractPlugin()]
        ),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ?  MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]___[hash:base64:5]',
                mode: 'icss',
              },
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
