const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

module.exports = {
  output: {
    uniqueName: 'stockist',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "stockist",
      filename: "remoteEntry.js",
      exposes: {
          './Stockist': './/src/bootstrap.ts',
      },
    }),
  ]
};
