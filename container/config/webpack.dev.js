const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js"
      }
    }),
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
