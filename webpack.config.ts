import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import { Configuration } from "webpack-dev-server";

const webpackConfig: webpack.Configuration & Configuration = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash].js",
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react auto testid",
      template: path.resolve(__dirname, "./index.html"),
    }) as any,
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    modules: [__dirname, "node_modules"],
  },

  mode: (process.env.NODE_ENV as any) || "development",
  devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
  devServer: {
    port: 3000,
  },
};

export = webpackConfig;
